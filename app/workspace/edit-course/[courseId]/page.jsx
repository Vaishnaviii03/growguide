"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseInfo from "../_components/CourseInfo";
import ChapterTopicList from "../_components/ChapterTopicList";

function EditCourse({viewCourse=false}) {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();

  useEffect(() => {
    GetCourseInfo();
  }, []);

  const GetCourseInfo = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/courses?courseId=" + courseId);
      console.log(result.data);
      setCourse(result.data);
    } catch (err) {
      console.error("❌ Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {loading ? <p>Loading...</p> : <CourseInfo course={course}  viewCourse={viewCourse} />}
      <ChapterTopicList course={course}/>
    </div>
  );
}

export default EditCourse;