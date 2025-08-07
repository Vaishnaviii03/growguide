'use client';

import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Loader2, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import { toast } from 'sonner';

function ChapterContent({ courseInfo, refreshData }) {
  const { courseId } = useParams();
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);
  const [isUpdating, setIsUpdating] = useState(false); // 👈 loading state

  if (!courseInfo) return <div className="p-10">Loading course...</div>;

  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = course?.courseContent || [];

  const currentChapter = courseContent[selectedChapterIndex];
  const videoData = currentChapter?.youtubeVideos || [];
  const topics = currentChapter?.topics || [];
  const completedChapters = enrollCourse?.completedChapters ?? [];

  const toggleChapterCompletion = async () => {
    setIsUpdating(true); // ✅ start loading

    let updatedChapters = [...completedChapters];

    const isAlreadyCompleted = completedChapters.includes(selectedChapterIndex);
    if (isAlreadyCompleted) {
      updatedChapters = updatedChapters.filter((ch) => ch !== selectedChapterIndex);
    } else {
      updatedChapters.push(selectedChapterIndex);
    }

    try {
      await axios.put('/api/enroll-course', {
        courseId,
        completedChapters: updatedChapters,
      });

      refreshData();
      toast.success(
        isAlreadyCompleted ? 'Marked as Incomplete' : 'Chapter Completed!'
      );
    } catch (error) {
      console.error(error);
      toast.error('Failed to update chapter status');
    } finally {
      setIsUpdating(false); // ✅ stop loading
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl mb-4">
          {selectedChapterIndex + 1}. {currentChapter?.chapterName || 'Untitled Chapter'}
        </h2>

        <Button
          variant={completedChapters.includes(selectedChapterIndex) ? 'outline' : 'default'}
          onClick={toggleChapterCompletion}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="animate-spin mr-2 w-4 h-4" />
          ) : completedChapters.includes(selectedChapterIndex) ? (
            <X className="mr-2" />
          ) : (
            <CheckCircle className="mr-2" />
          )}
          {isUpdating
            ? 'Updating...'
            : completedChapters.includes(selectedChapterIndex)
            ? 'Mark as Incomplete'
            : 'Mark as Completed'}
        </Button>
      </div>

      {/* Videos */}
      {videoData.length > 0 && (
        <>
          <h3 className="text-lg font-semibold my-4">▶️ Related Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoData.slice(0, 3).map((video, index) => (
              <div key={index} className="w-full">
                <YouTube
                  videoId={video?.videoId}
                  opts={{ height: '230', width: '100%' }}
                  className="rounded-xl overflow-hidden"
                />
                {video?.title && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{video.title}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Topics */}
      {topics.length > 0 && (
        <div className="mt-10 space-y-10">
          {topics.map((topic, index) => (
            <div key={index} className="p-5 bg-secondary rounded-2xl">
              <h2 className="font-bold text-xl text-primary mb-3">
                {index + 1}. {topic?.topic || 'Untitled Topic'}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: topic?.content || '' }}
                className="text-sm leading-7 text-gray-800"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChapterContent;