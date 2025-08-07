import axios from 'axios';
import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// 📘 Prompt to instruct Gemini to return course structure
const PROMPT = `
Generate a Learning Course based on the following user details. Return the result strictly in JSON format using this schema:

{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string", 
    "level": "string", 
    "includeVideo": "boolean", 
    "noOfChapters": "number", 
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"],
        "ImagePrompt": "string"
      }
    ]
  }
}

Now generate a course based on this input:
`;

// ✅ Image Generation Function
const GenerateImage = async (imagePrompt) => {
  const BASE_URL = 'https://aigurulab.tech';

  try {
    const result = await axios.post(
      `${BASE_URL}/api/generate-image`,
      {
        width: 1024,
        height: 1024,
        input: imagePrompt,
        model: 'flux',
        aspectRatio: '16:9',
      },
      {
        headers: {
          'x-api-key': process.env.AI_GURU_LAB_API,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('🖼️ Image generated:', result.data.image);
    return result.data.image;
  } catch (err) {
    console.error('❌ Image generation failed:', err.message);
    return null;
  }
};

// ✅ API Route: POST Handler
export async function POST(req) {
  try {
    const { courseId, ...formData } = await req.json();
    const user = await currentUser();

    // ✅ Move AI instance INSIDE function
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const model = 'gemini-2.5-pro';
    const contents = [
      {
        role: 'user',
        parts: [{ text: PROMPT + JSON.stringify(formData) }],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        thinkingConfig: { thinkingBudget: -1 },
        tools: [{ googleSearch: {} }],
      },
    });

    const rawContent = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      console.error('❌ Gemini response is empty or invalid:', response);
      return NextResponse.json(
        { error: 'AI response is empty or invalid' },
        { status: 500 }
      );
    }

    console.log('✅ Raw Gemini Output:', rawContent.slice(0, 500) + '...');

    let JSONResp;
    try {
      const cleaned = rawContent.replace(/```json|```/gi, '').trim();
      JSONResp = JSON.parse(cleaned);
    } catch (err) {
      console.error('❌ Failed to parse AI JSON:', err.message);
      return NextResponse.json(
        { error: 'Invalid JSON format from Gemini' },
        { status: 500 }
      );
    }

    const ImagePrompt = JSONResp?.course?.bannerImagePrompt || 'An educational modern banner';
    const bannerImageUrl = await GenerateImage(ImagePrompt);

    // ✅ Save course to DB
    await db.insert(coursesTable).values({
      ...formData,
      courseJson: JSONResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
      bannerImageUrl,
    });

    return NextResponse.json({ courseId });
  } catch (err) {
    console.error('🔥 Crash in route:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
