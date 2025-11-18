// AddCourseForm.tsx

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AddCourseFormProps {
  onAdd: () => void;  // Define the correct type for the 'onAdd' prop
}

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

export default function AddCourseForm({ onAdd }: AddCourseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    image: "",
    price: "",
    category: "",
    instructorImage: "",
    originalPrice: "",
    duration: "",
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation: all fields required
    const isEmpty = Object.values(formData).some((v) => v.trim() === "");
    if (isEmpty) {
      showToast("Please fill in all fields before adding a course.", "error");
      return;
    }

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add course");

      setFormData({
        title: "",
        instructor: "",
        image: "",
        price: "",
        category: "",
        instructorImage: "",
        originalPrice: "",
        duration: "",
      });

      showToast("Course added successfully!", "success");
      onAdd(); // Invoke the 'onAdd' prop after successfully adding a course
    } catch (err) {
      console.error(err);
      showToast("Error adding course. Please try again.", "error");
    }
  };

  return (
    <div className="relative">
      {/* Toast container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`px-4 py-3 rounded shadow text-white flex items-center justify-between min-w-[250px] ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <span>{toast.message}</span>
              <button
                className="ml-4"
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/60 dark:bg-neutral-800/40 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40 dark:border-neutral-700/40 transition-all duration-300"
      >
        <input
          type="text"
          placeholder="Course Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input-glass"
        />

        <input
          type="text"
          placeholder="Course Thumbnail URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="input-glass"
        />

        <input
          type="text"
          placeholder="Instructor Name"
          value={formData.instructor}
          onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
          className="input-glass"
        />

        <input
          type="text"
          placeholder="Instructor Image URL"
          value={formData.instructorImage}
          onChange={(e) =>
            setFormData({ ...formData, instructorImage: e.target.value })
          }
          className="input-glass"
        />

        <input
          type="number"
          placeholder="Original Price ($)"
          value={formData.originalPrice}
          onChange={(e) =>
            setFormData({ ...formData, originalPrice: e.target.value })
          }
          className="input-glass"
        />

        <input
          type="number"
          placeholder="Sale Price ($)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="input-glass"
        />

        <input
          type="text"
          placeholder="Category (ex: UI/UX, Web Dev)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="input-glass"
        />

        <input
          type="text"
          placeholder="Duration (ex: 10h 45m)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="input-glass"
        />

        <div className="md:col-span-2 flex justify-end pt-3">
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-3 rounded-xl shadow-xl hover:shadow-[0_0_25px_rgba(109,40,217,0.45)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
