'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CourseDetail } from '@/components/courseDetail/CourseDetail';
import { CourseType } from '@/components/coursecard/CourseCard';    

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = Number(params.courseId);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch('/api/courses', { cache: 'no-store' });
        const data: CourseType[] = await res.json();
        const found = data.find((c) => c.id === courseId);
        setCourse(found || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  if (loading) return <p className="text-center py-10">Loading course...</p>;
  if (!course) return <p className="text-center py-10">Course not found.</p>;

  return (
    <CourseDetail
      courseId={course.id}
      onClose={() => router.back()}
    />
  );
}
