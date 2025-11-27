"use client";

/* eslint-disable react-hooks/set-state-in-effect */
// This rule is overly strict. Calling setState in effects is perfectly fine when syncing data.

import { useEffect, useState } from "react";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Course } from "@/types/course";

interface CourseCardProps {
  searchTerm?: string;
  course?: Course;
  limit?: number;
}

export default function CourseCard({
  searchTerm = "",
  course,
  limit,
}: CourseCardProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Fetch courses from Supabase REST API if no single course is passed
  useEffect(() => {
    if (course) {
      setCourses([course]);
      setFilteredCourses([course]);
      return;
    }

    async function fetchCourses() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/courses?select=*&order=title.asc`,
          {
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
            },
          }
        );

        const data = await res.json();
        setCourses(data || []);
        setFilteredCourses(data || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    }

    fetchCourses();
  }, [course]);

  // Filter courses by search term
  useEffect(() => {
    if (course) return;
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

  // Increment views in Supabase
  const incrementViews = async (courseId: string) => {
    try {
      const { data: courseData } = await supabase
        .from("courses")
        .select("views")
        .eq("id", courseId)
        .single();

      if (!courseData) return;

      const newViews = (courseData.views || 0) + 1;

      await supabase
        .from("courses")
        .update({ views: newViews })
        .eq("id", courseId);
    } catch (err) {
      console.error("Increment views error:", err);
    }
  };

  let renderCourses = course ? [course] : filteredCourses;
  if (limit) renderCourses = renderCourses.slice(0, limit);

  return (
    <>
      {renderCourses.map((c) => (
        <div key={c.id}>
          <Link
            href={`/courses/${c.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col overflow-hidden h-full border border-gray-200 dark:border-gray-700"
            onClick={() => incrementViews(c.id)}
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
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                {c.category}
              </span>

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
                    <span>{c.views?.toLocaleString() ?? "0"} views</span>
                  </div>
                </div>
                <span className="text-gray-600 dark:text-gray-300 line-clamp-1">
                  By {c.instructor}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}