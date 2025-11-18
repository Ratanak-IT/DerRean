'use client';
import { CourseCard } from "@/components/coursecard/CourseCard";
import { CourseCategories } from "@/components/coursecard/CourseCategories";
import { HeroSection } from "@/components/hero/HeroSection";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";



export default function Home() {
   const handleCourseClick = (courseId: number) => {
    console.log('Course clicked:', courseId);
  };
  return (
    <>
    <HeroSection/>
    <CourseCategories/>
    <section className="py-5 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gray-900 dark:text-white mb-2">Featured Courses</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Learn from industry experts and advance your career
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mt-4 md:mt-0"
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" /> <span>Filter</span>
            </button>
            <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Most Popular</option>
              <option>Highest Rated</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </motion.div>
        </div>
      </div>
    </section>

    <CourseCard onCourseClick={handleCourseClick} />
    </>
  );
}
