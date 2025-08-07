import React, { useContext } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { CheckCircle } from 'lucide-react';

function ChapterListSidebar({ courseInfo, completedChapters = [] }) {
  const courseContent = courseInfo?.courses?.courseContent || [];
  const { selectedChapterIndex, setelectedChapterIndex } = useContext(SelectedChapterIndexContext);

  return (
    <div className="w-[250px] min-w-[250px] bg-secondary h-screen p-5 overflow-y-auto border-r border-gray-200">
      <h2 className="my-3 font-bold text-lg text-gray-800">
        Chapters ({courseContent.length})
      </h2>

      <Accordion
        type="single"
        collapsible
        defaultValue={courseContent[selectedChapterIndex]?.chapterName}
      >
        {courseContent.map((chapter, index) => {
          const isCompleted = completedChapters.includes(index);
          const isSelected = selectedChapterIndex === index;

          return (
            <AccordionItem
              key={index}
              value={chapter?.chapterName}
              className={`rounded-lg mb-2 transition-all ${
                isSelected
                  ? 'bg-white border-l-4 border-primary shadow'
                  : 'bg-muted'
              } ${isCompleted && 'border-l-4 border-green-500'}`}
            >
              <AccordionTrigger
                className="text-left text-sm font-medium px-3 py-2 flex justify-between items-center hover:text-primary"
                onClick={() => setelectedChapterIndex(index)}
              >
                <span>
                  {index + 1}. {chapter?.chapterName}
                </span>
                {isCompleted && (
                  <CheckCircle className="text-green-500 w-4 h-4 ml-2 shrink-0" />
                )}
              </AccordionTrigger>

              <AccordionContent className="ml-3 text-sm">
                {chapter?.topics?.map((topic, topicIndex) => (
                  <div
                    key={topicIndex}
                    className="p-2 my-1 rounded bg-white hover:bg-accent text-gray-700 transition-all"
                  >
                    {topic?.topic}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default ChapterListSidebar;
