import { Gift } from 'lucide-react';
import React from 'react';

function ChapterTopicList({ course }) {
  const courseLayout = course?.courseJson?.course;

  return (
    <section>
      <h2 className="font-bold text-3xl mt-10 text-center">Chapters & Topics</h2>
      <div className="flex flex-col items-center justify-center mt-10">
        {courseLayout?.chapters.map((chapter, chapterIndex) => (
          <article key={chapterIndex} className="flex flex-col items-center mb-16">

            {/* Chapter Card */}
            <div className="p-4 border shadow rounded-xl bg-primary text-white w-80 text-center mb-6">
              <h3 className="text-sm">Chapter {chapterIndex + 1}</h3>
              <h2 className="font-bold text-lg">{chapter.chapterName}</h2>
              <div className="text-xs flex justify-between mt-2 px-4">
                <span>Duration: {chapter?.duration}</span>
                <span>No. of Topics: {chapter?.topics?.length}</span>
              </div>
            </div>

            {/* Topics Timeline */}
            {chapter?.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="flex flex-col items-center">

                {/* Connector line */}
                {topicIndex !== 0 && <div className="h-10 bg-gray-300 w-1"></div>}

                {/* Topic Item */}
                <div className="flex items-center gap-5 mb-2 w-full max-w-3xl px-4">
                  {topicIndex % 2 === 0 ? (
                    <>
                      <p className="text-right flex-1">{topic}</p>
                      <div className="rounded-full bg-gray-300 px-4 py-2 text-gray-700 font-semibold">
                        {topicIndex + 1}
                      </div>
                      <div className="flex-1" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1" />
                      <div className="rounded-full bg-gray-300 px-4 py-2 text-gray-700 font-semibold">
                        {topicIndex + 1}
                      </div>
                      <p className="text-left flex-1">{topic}</p>
                    </>
                  )}
                </div>

                {/* Gift Icon at the End */}
                {topicIndex === chapter.topics.length - 1 && (
                  <>
                    <div className="h-10 bg-gray-300 w-1"></div>
                    <Gift className="rounded-full bg-gray-300 p-2 text-gray-600 w-10 h-10 mt-1" />
                  </>
                )}
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

export default ChapterTopicList;