"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";

interface EnrollButtonProps {
  courseId: string;
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { refreshWishlist } = useWishlist();

  // Check login + enrollment status
  useEffect(() => {
    const checkEnrollment = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUserId(null);
        setEnrolled(false);
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();

      // If no error and row exists → enrolled
      setEnrolled(!error && !!data);
    };

    checkEnrollment();
  }, [courseId]);

  const handleToggleEnroll = async () => {
    if (!userId) {
      router.push("/login");
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

        toast.success("Unenrolled successfully");
        setEnrolled(false);
      } else {
        // Enroll
        const { error } = await supabase.from("enrollments").insert({
          user_id: userId,
          course_id: courseId,
          enrolled_at: new Date().toISOString(),
        });

        if (error) throw error;

        toast.success("Enrolled successfully!");
        setEnrolled(true);
      }

      // Refresh heart badge count
      await refreshWishlist();
    } catch (error) {
      // Fixed: no more `any`
      const err = error as { message?: string };
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const text = !userId
    ? "Login to Enroll"
    : loading
      ? "Processing..."
      : enrolled
        ? "Unenroll"
        : "Add to Wishlist";

  const disabled = loading || !userId;

  return (
    <button
      onClick={handleToggleEnroll}
      disabled={disabled}
      className={`px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200
        ${disabled
          ? "bg-gray-400 cursor-not-allowed opacity-70"
          : enrolled
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 text-white"
        }`}
    >
      {text}
    </button>
  );
}





