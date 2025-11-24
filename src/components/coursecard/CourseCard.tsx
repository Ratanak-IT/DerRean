"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export interface CourseType {
  id: string;
  title: string;
  description?: string;
  instructor: string;
  instructorimage?: string;
  rating?: number;
  reviews?: number;
  students?: number;
  enrolled?: number;
  lessons?: number;
  image?: string;
  category: string;
  level?: string;
  duration?: string;
  bestseller?: boolean;
}

interface CourseCardProps {
  searchTerm?: string;
  course?: CourseType; // Optional single course for wishlist
}

export default function CourseCard({ searchTerm = "", course }: CourseCardProps) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all courses only if no single course is passed
  useEffect(() => {
    if (course) {
      setLoading(false);
      return;
    }

    async function fetchCourses() {
      try {
        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .order("title", { ascending: true });

        if (error) throw error;

        setCourses(data || []);
        setFilteredCourses(data || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, [course]);

  useEffect(() => {
  if (course) return; // skip filtering for single course

  if (!searchTerm.trim()) {
    setFilteredCourses(courses);
    return;
  }

  const lower = searchTerm.toLowerCase();
  const filtered = courses.filter((c) => {
    const title = c.title?.toLowerCase() || "";
    const category = c.category?.toLowerCase() || "";
    const instructor = c.instructor?.toLowerCase() || "";
    const description = c.description?.toLowerCase() || "";

    return (
      title.includes(lower) ||
      category.includes(lower) ||
      instructor.includes(lower) ||
      description.includes(lower)
    );
  });

  setFilteredCourses(filtered);
}, [searchTerm, courses, course]);


  const handleCourseClick = (id: string) => {
    router.push(`/courses/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-20 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Loading courses...
        </p>
      </div>
    );
  }

  const renderCourses = course ? [course] : filteredCourses;

  if (renderCourses.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          No courses found matching <strong>{searchTerm}</strong>
        </p>
        <p className="mt-2 text-gray-500">Try a different search term.</p>
      </div>
    );
  }

  return (
    <section className="py-2 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {renderCourses.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <div
                onClick={() => handleCourseClick(c.id)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col overflow-hidden h-full border border-gray-200 dark:border-gray-700"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={c.image || "/images/course-placeholder.png"}
                    alt={c.title}
                    width={300}
                    height={150}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {c.level && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                      {c.level}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-1">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {c.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {c.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                    {c.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{c.duration || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{c.lessons || 0} lessons</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {c.rating ?? "4.8"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <Users className="w-3.5 h-3.5" />
                        <span>{c.enrolled?.toLocaleString() ?? "1,000"}</span>
                      </div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300 line-clamp-1">
                      By {c.instructor}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
