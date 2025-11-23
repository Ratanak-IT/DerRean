"use client";

import { useState } from "react";

import CourseCard from "@/components/coursecard/CourseCard";
import { CourseSearch } from "@/components/searchbar/CourseSearch";

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="dark:bg-gray-900 bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          All Courses
        </h1>

        {/* Search Bar */}
        <CourseSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CourseCard searchTerm={searchTerm} />
      </div>
    </div>
  );
}