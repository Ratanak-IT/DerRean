"use client";

import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Clock, Users, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// ──────────────────────────────────────────────────────────────
// Course type (UUID as string)
export interface CourseType {
  id: string; // UUID
  title: string;
  instructor: string;
  instructorimage?: string;
  rating?: number;
  reviews?: number;
  students?: number;
  price: number;
  originalPrice?: number;
  image?: string;
  category: string;
  level?: string;
  duration?: string;
  bestseller?: boolean;
}

// ──────────────────────────────────────────────────────────────
export interface CourseCardProps {
  onCourseClick?: (courseId: string) => void;
}

const CourseCard: FC<CourseCardProps> = ({ onCourseClick }) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Click handler – fixed!
  const handleCourseClick = (id: string) => {
    if (onCourseClick) {
      onCourseClick(id);
    } else {
      router.push(`/courses/${id}`); // ← HERE WAS THE BUG (was courses.id)
    }
  };

  // Fetch courses
  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("title", { ascending: true });

        if (error) throw error;
        setCourses(data || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg">Loading courses...</p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => {
            const discount = course.originalPrice
              ? Math.round(
                  ((course.originalPrice - course.price) / course.originalPrice) * 100
                )
              : 0;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
              >
                <div
                  onClick={() => handleCourseClick(course.id)} // ← pass the correct id
                  className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={course.image || "/images/course-placeholder.png"}
                      alt={course.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {course.bestseller && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs font-medium">
                          <TrendingUp className="w-3 h-3" />
                          Bestseller
                        </span>
                      )}
                      {course.level && (
                        <span className="inline-flex items-center px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-medium">
                          {course.level}
                        </span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                          {discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-indigo-500 dark:text-indigo-400 mb-2 text-sm">
                      {course.category}
                    </p>
                    <h3 className="text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-500 transition-colors font-semibold">
                      {course.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={course.instructorimage || "/images/instructor-placeholder.png"}
                          alt={course.instructor}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {course.instructor}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-900 dark:text-white text-sm font-medium">
                        {course.rating ?? "4.8"}
                      </span>
                      <span className="text-gray-500 text-xs">
                        ({course.reviews?.toLocaleString() ?? "1.2k"})
                      </span>
                    </div>

                    {/* Duration & Students */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration ?? "10"} hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {course.students
                            ? (course.students / 1000).toFixed(1) + "k"
                            : "5k"}
                        </span>
                      </div>
                    </div>

                    <div className="flex-grow" />

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ${course.price}
                        </span>
                        {course.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseCard;