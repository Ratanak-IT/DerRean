"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BookOpen } from "lucide-react";
import { CourseSearch } from "@/components/searchbar/CourseSearch";
import CourseCard from "@/components/coursecard/CourseCard";
import { Course } from "@/types/course";

export default function WishlistPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  useEffect(() => {
    async function fetchEnrolledCourses() {
      setLoading(true);

      // Get user JWT from Supabase client
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }

      try {
        // 1️⃣ Fetch enrollments for this user
        const enrollRes = await fetch(
          `${SUPABASE_URL}/rest/v1/enrollments?user_id=eq.${session.user.id}&select=course_id`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!enrollRes.ok) throw new Error("Failed to fetch enrollments");
        const enrollments: { course_id: string }[] = await enrollRes.json();

        if (!enrollments.length) {
          setEnrolledCourses([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch actual courses
        const courseIds = enrollments.map(e => e.course_id).join(",");
        const coursesRes = await fetch(
          `${SUPABASE_URL}/rest/v1/courses?id=in.(${courseIds})`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!coursesRes.ok) throw new Error("Failed to fetch courses");
        const courses: Course[] = await coursesRes.json();

        setEnrolledCourses(courses || []);
      } catch (err) {
        console.error("Wishlist REST API fetch error:", err);
        setEnrolledCourses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrolledCourses();
  }, [SUPABASE_URL, SUPABASE_KEY]);

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter(course =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enrolledCourses, searchTerm]);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 mt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-blue-100">
            Continue your learning journey and achieve your goals
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <CourseSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Loading spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Loading courses...
            </p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12 dark:bg-gray-800 rounded-xl">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? "No courses found" : "No enrolled courses yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {searchTerm
                ? `No courses found matching "${searchTerm}"`
                : "Start your learning journey by enrolling in a course"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} searchTerm={searchTerm} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
