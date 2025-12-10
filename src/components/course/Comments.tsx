"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { MessageCircle, Send } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_email: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

export default function Comments({ courseId }: { courseId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments with user info
  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, content, created_at, user_id")
      .eq("course_id", courseId)
      .order("created_at", { ascending: false });

    if (!data || data.length === 0) {
      setComments([]);
      return;
    }

    const withUser = await Promise.all(
      data.map(async (c) => {
        const { data: profile } = await supabase
          .from("profiless")
          .select("email, full_name, avatar_url")
          .eq("id", c.user_id)
          .single();

        let avatarPublicUrl: string | null = null;
        if (profile?.avatar_url) {
          avatarPublicUrl = supabase.storage
            .from("avatars")
            .getPublicUrl(profile.avatar_url).data.publicUrl;
        }

        return {
          id: c.id,
          content: c.content,
          created_at: c.created_at,
          user_email: profile?.email ?? null,
          full_name: profile?.full_name ?? "Anonymous",
          avatar_url: avatarPublicUrl,
        };
      })
    );

    setComments(withUser);
  }, [courseId]);

  // useEffect with async wrapper
  useEffect(() => {
    const loadComments = async () => {
      await fetchComments();
    };

    loadComments();

    const channel = supabase
      .channel("comments-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `course_id=eq.${courseId}`,
        },
        () => fetchComments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [courseId, fetchComments]);

  // Handle form submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please log in to comment.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("comments").insert({
      course_id: courseId,
      user_id: user.id,
      content: text.trim(),
    });

    if (!error) {
      setText("");
      fetchComments();
    } else {
      alert("Failed to post comment.");
    }
    setLoading(false);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-300 dark:border-gray-700 overflow-hidden mt-12">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:text-white bg-clip-text text-transparent flex items-center gap-3">
            <MessageCircle className="w-7 h-7 text-indigo-600 dark:text-gray-200" />
            Comments ({comments.length})
          </h2>
        </div>

        {/* Form */}
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative group">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts... be kind!"
                className="w-full px-6 py-5 pr-16 text-lg bg-gray-50 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="p-8">
          {comments.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-28 h-28 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-14 h-14 text-indigo-400 dark:text-indigo-500" />
              </div>
              <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
                No comments yet.
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {comments.map((c, idx) => (
                <div
                  key={c.id}
                  className={`flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-gray-50/80 to-white dark:from-gray-800/50 dark:to-gray-900/30 border border-gray-300 dark:border-gray-700 hover:shadow-xl transition-all duration-500 ${
                    idx === 0 ? "ring-2 ring-indigo-500/30" : ""
                  }`}
                >   
                  <div className="w-12 h-12 rounded-full overflow-hidden">
  {c.avatar_url ? (
    <Image
      src={c.avatar_url}
      alt={c.full_name ?? "User"}
      width={48}
      height={48}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
      <span className="text-white text-lg font-bold">
        {c.full_name?.charAt(0)?.toUpperCase() || "U"}
      </span>
    </div>
  )}
</div>


                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                        {c.full_name || "Anonymous"}
                      </h4>
                      <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        {formatDate(c.created_at)}
                      </span>
                    </div>

                    {c.user_email && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {c.user_email}
                      </p>
                    )}

                    <p className="text-gray-800 dark:text-gray-200 text-[18px] leading-relaxed text-base">
                      {c.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
