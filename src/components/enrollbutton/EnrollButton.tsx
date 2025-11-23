"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";

interface EnrollButtonProps {
  courseId: string;
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is already enrolled
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;
        setUserId(user.id);

        const { data, error } = await supabase
          .from("enrollments")
          .select("*")
          .eq("user_id", user.id)
          .eq("course_id", courseId)
          .single();

        if (!error && data) setEnrolled(true);
      } catch (err: unknown) {
        console.error("Enrollment check error:", err);
      }
    };

    checkEnrollment();
  }, [courseId]);

  // Handle enroll/unenroll toggle
  const handleToggleEnroll = async () => {
    if (!userId) {
      toast.error("Please log in first.");
      return;
    }

    setLoading(true);
    try {
      if (enrolled) {
        // Unenroll
        const { error } = await supabase
          .from("enrollments")
          .delete()
          .eq("user_id", userId)
          .eq("course_id", courseId);

        if (error) throw error;

        toast.success("You have unenrolled from the course.");
        setEnrolled(false);
      } else {
        // Enroll
        const { error } = await supabase.from("enrollments").insert({
          course_id: courseId,
          user_id: userId,
          enrolled_at: new Date().toISOString(),
        });

        if (error) throw error;

        toast.success("Enrolled successfully!");
        setEnrolled(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Failed to update enrollment.");
      console.error("Enroll/Unenroll error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleEnroll}
      disabled={loading}
      className={`px-8 py-4 rounded-full font-bold text-lg shadow-lg transition transform hover:scale-105
        ${enrolled ? "bg-red-500 text-white hover:shadow-xl" : "bg-indigo-600 text-white hover:shadow-xl"}`}
    >
      {loading ? "Processing..." : enrolled ? "Unenroll" : "Enroll Now"}
    </button>
  );
}
