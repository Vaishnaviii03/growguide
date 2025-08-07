import React from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

function EnrollCourseCard({ course, enrollCourse }) {
  const courseJson = course?.courseJson?.course;

  // Calculate percentage progress safely
  const CalculatePerProgress = () => {
    const completed = enrollCourse?.completedChapters?.length || 0;
    const total = course?.courseContent?.length || 1; // prevent divide by zero
    return Math.round((completed / total) * 100);
  };

  const progress = CalculatePerProgress();
  const banner = course?.bannerImageUrl || '/default-thumbnail.jpg'; // fallback image
  const courseName = courseJson?.name || 'Untitled Course';
  const courseDesc = courseJson?.description || 'No description available.';

  return (
    <div className="shadow-md border rounded-xl overflow-hidden bg-white max-w-4xl mx-auto">
      {/* Banner Image */}
      <Image
        src={banner}
        alt={courseName}
        width={400}
        height={225}
        className="w-full aspect-video object-cover"
      />

      {/* Details */}
      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-xl font-bold text-gray-900">{courseName}</h2>
        <p className="text-sm text-gray-500 line-clamp-3">{courseDesc}</p>

        {/* Progress bar */}
        <div className="mt-2">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        {/* Continue button */}
        <Link href={`/workspace/view-course/${course?.cid}`} passHref>
          <Button className="w-full mt-4 gap-2" variant="default">
            <PlayCircle size={18} />
            Continue Learning
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
