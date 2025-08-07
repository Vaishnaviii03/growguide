'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EnrollCourseCard from './EnrollCourseCard';

function EnrollCourseList() {
  const [enrolledCourseList, setEnrolledCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetEnrolledCourse();
  }, []);

  const GetEnrolledCourse = async () => {
    try {
      const response = await axios.get('/api/enroll-course');
      console.log(response.data);
      setEnrolledCourseList(response.data || []);
    } catch (err) {
      console.error('Error fetching enrolled courses:', err);
      setError('Failed to load enrolled courses.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Continue Learning Your Courses</h2>

      {/* Loading */}
      {loading && <p className="text-sm text-gray-500">Loading your enrolled courses...</p>}

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Empty */}
      {!loading && enrolledCourseList.length === 0 && (
        <p className="text-sm text-gray-600">You haven’t enrolled in any courses yet.</p>
      )}

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourseList.map((courseItem, index) => (
          <EnrollCourseCard
            key={index}
            course={courseItem?.courses}
            enrollCourse={courseItem?.enrollCourse}
          />
        ))}
      </div>
    </div>
  );
}

export default EnrollCourseList;
