import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { coursesTable } from '@/config/schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';

// Prompt for Gemini
const PROMPT = `
You are a course content generator.

Given a chapter and its topics, return valid JSON in this exact format (no markdown or extra text):

{
  "chapterName": "<Chapter Name>",
  "topics": [
    {
      "topic": "<Topic Name>",
      "content": "<HTML string explaining the topic>"
    }
  ]
}

Respond with JSON only. Don't use \\\` or markdown or add extra text.

User Input:
`;

// YouTube API base URL
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

// ✅ Helper to fetch videos from YouTube
const GetYoutubeVideo = async (topic) => {
  try {
    const params = {
      part: 'snippet',
      q: topic,
      maxResults: 4,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY,
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    return resp.data.items.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    }));
  } catch (error) {
    console.error(`❌ YouTube API error for topic: ${topic}`, error);
    return [];
  }
};

// ✅ Clean JSON from Gemini's raw response
function extractJsonFromText(text) {
  try {
    const cleaned = text.replace(/json|```/gi, '').trim();
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      const jsonString = cleaned.slice(firstBrace, lastBrace + 1);
      return JSON.parse(jsonString);
    }
  } catch (err) {
    console.warn('❌ JSON parsing failed:', err.message);
  }
  return null;
}

// ✅ Generates topic content for a chapter using Gemini
async function generateChapterContent(chapter, retries = 1) {
  // ✅ Move `ai` inside the function (this is the fix!)
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const model = 'gemini-2.5-pro';
  const config = {
    thinkingConfig: { thinkingBudget: -1 },
    tools: [{ googleSearch: {} }],
  };

  const prompt = PROMPT + JSON.stringify(chapter);
  const contents = [{ role: 'user', parts: [{ text: prompt }] }];

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({ model, config, contents });
      const rawContent = response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawContent) {
        console.warn(`❌ Empty Gemini response for chapter "${chapter.chapterName}" (attempt ${attempt + 1})`);
        continue;
      }

      console.log(`🧠 Gemini response for chapter "${chapter.chapterName}":`, rawContent.slice(0, 300) + '...');

      const parsed = extractJsonFromText(rawContent);
      if (parsed?.topics?.length > 0) return parsed;

      console.warn(`❌ Invalid JSON or no topics for chapter "${chapter.chapterName}"`);
    } catch (err) {
      console.error(`❌ Error in Gemini for chapter "${chapter.chapterName}" (attempt ${attempt + 1})`, err);
    }
  }

  return null;
}

// ✅ API handler
export async function POST(req) {
  try {
    const { courseJson, courseTitle, courseId } = await req.json();
    const course = courseJson;

    if (!Array.isArray(course?.chapters)) {
      return NextResponse.json(
        { error: 'Invalid course format: chapters missing or not an array' },
        { status: 400 }
      );
    }

    const chapterResults = await Promise.allSettled(
      course.chapters.map(async (chapter) => {
        const parsed = await generateChapterContent(chapter, 1);

        if (!parsed || !parsed.topics) {
          return {
            chapterName: chapter.chapterName || 'Unknown Chapter',
            topics: [],
            youtubeVideos: [],
            error: 'AI failed or returned invalid content',
          };
        }

        const youtubeVideos = await GetYoutubeVideo(chapter.chapterName);
        return {
          chapterName: parsed.chapterName || chapter.chapterName,
          topics: parsed.topics,
          youtubeVideos,
        };
      })
    );

    const CourseContent = chapterResults.map((r, i) =>
      r.status === 'fulfilled'
        ? r.value
        : {
            chapterName: course.chapters[i]?.chapterName || 'Unknown Chapter',
            topics: [],
            youtubeVideos: [],
            error: 'Generation failed',
          }
    );

    const filteredCourseContent = CourseContent.filter(
      (ch) => Array.isArray(ch.topics) && ch.topics.length > 0 && !ch.error
    );

    await db
      .update(coursesTable)
      .set({ courseContent: filteredCourseContent })
      .where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
      courseId,
      courseName: courseTitle,
      CourseContent,
    });
  } catch (err) {
    console.error('❌ POST handler error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
