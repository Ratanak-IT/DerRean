"use client";

import CourseCard from "@/components/coursecard/CourseCard";
import { useRouter } from "next/navigation";
export default function ProductsPage() {
  const router = useRouter();
  const onCourseClick = (courseId: number) => {
    router.push(`/courses/${courseId}`);
  };
  // Dummy click handler

  return (
    <div className="dark:bg-black min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-6">All Courses</h1>
        <CourseCard onCourseClick={onCourseClick} />
      </div>
    </div>
  );
}
