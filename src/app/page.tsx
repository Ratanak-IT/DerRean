"use client";

import { HeroSection } from "@/components/hero/HeroSection";
import { CourseCategories } from "@/components/coursecard/CourseCategories";
import CourseCard from "@/components/coursecard/CourseCard";
import OurContent from "@/components/ourcontent/ourcontent";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Categories */}
      <CourseCategories />

      {/* Featured Courses Section */}
      <section className="bg-gray-100 dark:bg-gray-900">
        <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OurContent
            title="Featured Courses"
            text="Learn from industry experts and advance your career"
          />
        </div>

        {/* Course Grid – No props needed! Handles click & routing itself */}
        <div className="pb-16">
          <CourseCard limit={4}/>
        </div>
      </section>
    </>
  );
}