"use client";

import AppHeader from '@/app/workspace/_components/AppHeader';
import React, { useEffect, useState } from 'react';
import ChapterListSidebar from '../_components/ChapterListSidebar';
import ChapterContent from '../_components/ChapterContent';
import { useParams } from 'next/navigation';
import axios from 'axios';

function Course() {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    try {
      const result = await axios.get('/api/enroll-course?courseId=' + courseId);
      console.log(result.data);
      setCourseInfo(result.data);
    } catch (error) {
      console.error('Failed to fetch course info:', error);
    }
  };

  const completedChapters = courseInfo?.enrollCourse?.completedChapters ?? [];

  return (
    <div>
      <AppHeader hideSidebar={true} />
      <div className="flex gap-10">
        <ChapterListSidebar
          courseInfo={courseInfo}
          completedChapters={completedChapters}
        />
        <ChapterContent
          courseInfo={courseInfo}
          refreshData={GetEnrolledCourseById} // ✅ fixed: passing function itself
        />
      </div>
    </div>
  );
}

export default Course;
