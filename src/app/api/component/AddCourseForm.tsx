"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Clock, User, Link2, Trophy, List, FileText } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

interface AddCourseFormProps {
  onAdd: () => void;
  onClose?: () => void;
}

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export default function AddCourseForm({ onAdd, onClose }: AddCourseFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [toastList, setToastList] = useState<Toast[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    category: "",
    duration: "",
    level: "Beginner" as CourseLevel,
    lessons: "",
    description: "",
    content: "",
    image: "",
    instructorimage: "",
  });

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToastList((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToastList((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      instructor: "",
      category: "",
      duration: "",
      level: "Beginner",
      lessons: "",
      description: "",
      content: "",
      image: "",
      instructorimage: "",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("courses").insert({
        title: formData.title.trim(),
        instructor: formData.instructor.trim(),
        category: formData.category.trim(),
        duration: formData.duration.trim(),
        level: formData.level,
        lessons: Number(formData.lessons),
        description: formData.description.trim(),
        content: formData.content.trim(),
        image: formData.image.trim(),
        instructorimage: formData.instructorimage.trim(),
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success("Course added successfully!");
      resetForm();
      setIsOpen(false);
      onAdd();
      onClose?.();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message+"Failed to save profile.");
      } else {
        showToast("Failed to add course", "error");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
      >
        <BookOpen size={20} />
        Add New Course
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <BookOpen className="text-indigo-600" />
                  Add New Course
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FileText size={16} />
                      Course Title
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Complete React Masterclass 2025"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  {/* Instructor */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <User size={16} />
                      Instructor Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    />
                  </div>

                  {/* Category & Level */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Web Development"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Trophy size={16} />
                      Difficulty Level
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value as CourseLevel })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>

                  {/* Duration & Lessons */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Clock size={16} />
                      Duration
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 24 hours"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <List size={16} />
                      Number of Lessons
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="48"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      value={formData.lessons}
                      onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText size={16} />
                    Course Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write a compelling description about this course..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* What You'll Learn */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <List size={16} />
                    What Students Will Learn (one per line)
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="• Build full-stack web apps with React & Node.js&#10;• Master TypeScript from scratch&#10;• Deploy apps to Vercel & AWS&#10;• Learn authentication with NextAuth"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono text-sm"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>

                {/* Image URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Link2 size={16} />
                      Course Image URL
                    </label>
                    <input
                      required
                      type="url"
                 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <User size={16} />
                      Instructor Image URL
                    </label>
                    <input
                      required
                      type="url"
                    
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                      value={formData.instructorimage}
                      onChange={(e) => setFormData({ ...formData, instructorimage: e.target.value })}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition font-medium disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? "Adding Course..." : "Add Course"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 space-y-3 z-[60]">
        <AnimatePresence>
          {toastList.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className={`px-6 py-4 rounded-xl shadow-2xl text-white font-medium flex items-center gap-3 min-w-80 ${
                toast.type === "success" ? "bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gradient-to-r from-red-600 to-rose-600"
              }`}
            >
              {toast.type === "success" ? "Success" : "Error"}
              <span className="flex-1">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
