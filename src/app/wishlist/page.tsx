"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BookOpen } from "lucide-react";
import { CourseSearch } from "@/components/searchbar/CourseSearch";
import CourseCard, { CourseType } from "@/components/coursecard/CourseCard";

export default function WishlistPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<CourseType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchEnrolledCourses() {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    // Step 1: Get your own enrollments
    const { data: enrollments, error: e1 } = await supabase
      .from("enrollments")
      .select("course_id")
      .eq("user_id", user.id);   // ← this must match exactly

    if (e1) {
      console.error("Enrollments error:", e1);
      setLoading(false);
      return;
    }

    if (!enrollments || enrollments.length === 0) {
      console.log("No enrollments found for this user");
      setEnrolledCourses([]);
      setLoading(false);
      return;
    }

    // Step 2: Get the actual courses
    const { data: courses } = await supabase
      .from("courses")
      .select("*")
      .in("id", enrollments.map(e => e.course_id));

    setEnrolledCourses(courses || []);
    setLoading(false);
  }

  fetchEnrolledCourses();
}, []);

  // Filter enrolled courses by search term
  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter(
      (course) =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enrolledCourses, searchTerm]);

  if (loading) {
    return (
      <div className="text-center py-20 dark:bg-gray-900 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Loading courses...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-blue-100">
            Continue your learning journey and achieve your goals
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <CourseSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              No enrolled courses yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Start your learning journey by enrolling in a course
            </p>
          </div>
        ) : (
          <div className="grid">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
