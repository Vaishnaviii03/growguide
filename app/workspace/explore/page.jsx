"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Skeleton } from '@/components/ui/skeleton';

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user) GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    const result = await axios.get('/api/courses?courseId=0');
    setCourseList(result.data);
  };

  return (
    <div className='p-5 md:p-10'>
      <h2 className='font-bold text-3xl mb-6'>Explore more courses</h2>

      {/* ✅ Styled Search Bar */}
      <div className='flex flex-col sm:flex-row sm:items-center gap-3 max-w-2xl mb-8'>
        <Input 
          placeholder="Search for a course..." 
          className="flex-1 h-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="h-10">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* ✅ Course Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
        {courseList.length>0? courseList?.map((course, index) => (
          <CourseCard course={course} key={index} />
        )) :
        [0,1,2,3].map((item, index)=>(
          <Skeleton key={index} className="h-[240px] w-full" />
        ))
        }
      </div>
    </div>
  );
}

export default Explore;