'use client';
import { Book, Clock, PlayCircleIcon, Settings, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';



function CourseInfo({ course, viewCourse }) {
  const courseLayout = course?.courseJson?.course;
  const [loading,setLoading]= useState(false);
  const router  =useRouter();

  const GenerateCourseContent=async()=>{
    //api
    setLoading(true)
    try{
      const  result = await axios.post('/api/generate-course-content',{
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId:course?.cid
      })
      console.log(result.data);
      setLoading(false);
      router.replace('/workspace')
      toast.success("Course Generated successfully")
    }
    catch(e){
      console.log(e);
      setLoading(false);
      toast.error("Server side error, Try again!")
    }

  }

  if (!courseLayout) return <p>No course data available</p>;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 bg-white p-6 rounded-lg shadow-md">
      {/* Left Section: Text Info */}
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        <h2 className="font-bold text-3xl text-gray-900">
          {courseLayout?.name}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {courseLayout?.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Clock className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">{courseLayout?.chapters?.[0]?.duration || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Book className="text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Chapters</p>
              <p className="font-semibold">{courseLayout?.noOfChapters}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <TrendingUp className="text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Difficulty Level</p>
              <p className="font-semibold capitalize">
                {courseLayout?.level || "N/A"}
              </p>
            </div>
          </div>
        </div> 
       {!viewCourse ?
       <Button className="max-w-sm" onClick={GenerateCourseContent} disabled={loading}>
       <Settings className="mr-2" /> {loading ? 'Generating...' : 'Generate Content'} </Button> 
       :<Link href={'/course/' + course?.cid}><Button><PlayCircleIcon/>Continue Learning</Button></Link> }

      </div>

      {/* Right Section: Image */}
      <div className="w-full md:w-1/3 flex justify-center items-center">
        <Image
          src={course?.bannerImageUrl}
          alt="Course Banner"
          width={400}
          height={240}
          className="w-full mt-5 md:mt-0 object-cover aspect-auto h-[240px] rounded-lg object-contain"
        />
      </div>
    </div>
  );
}

export default CourseInfo;