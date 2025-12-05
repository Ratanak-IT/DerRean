"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, AlertTriangle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  image?: string;
  instructorimage?: string;
  duration?: string;
}

interface CourseTableProps {
  courses: Course[];
  onDelete: () => void;
}

export default function CourseTable({ courses, onDelete }: CourseTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [updating, setUpdating] = useState(false);

  // 🔥 DELETE COURSE
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/courses?id=${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to delete course");

      setDeleteId(null);
      onDelete(); // refresh
    } catch (err) {
      console.error("Delete course error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 UPDATE COURSE
  const handleUpdate = async () => {
    if (!editCourse) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/courses`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCourse),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");

      setEditCourse(null);
      onDelete(); // refresh
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setUpdating(false);
    }
  };

  // 🔥 ONE TABLE ROW
  const CourseRow = ({ course }: { course: Course }) => (
    <tr className="border-b transition duration-200">
      <td className="p-3 flex items-center gap-3">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            width={60}
            height={40}
            className="rounded-md object-cover shadow-sm"
          />
        ) : (
          <div className="w-[60px] h-[40px] bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
            No Image
          </div>
        )}
        <span className="font-medium text-gray-800 dark:text-white">
          {course.title}
        </span>
      </td>

      <td className="p-3 items-center gap-3">
        {course.instructorimage ? (
          <Image
            src={course.instructorimage}
            alt={course.instructor || "Instructor image"}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-[36px] h-[36px] bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
            No Image
          </div>
        )}
      </td>

      <td className="p-3">
        <span className="text-gray-700 dark:text-white">
          {course.instructor}
        </span>
      </td>
      <td className="p-3">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
          {course.category}
        </span>
      </td>

      <td className="p-3 text-[15px] text-gray-600 dark:text-white">
        {course.duration ?? "-"}
      </td>

      <td className="p-3 text-center flex justify-center gap-2">
        {/* EDIT BUTTON */}
        <button
          onClick={() => setEditCourse(course)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md transition"
        >
          ✏ Edit
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={() => setDeleteId(course.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center gap-2 transition"
        >
          <Trash2 size={16} /> Delete
        </button>
      </td>
    </tr>
  );

  return (
    <>
      {/* ---------------- DELETE POPUP ---------------- */}
      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={26} />
              <h2 className="text-xl font-bold">Confirm Delete</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={loading}
                className={`px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update*/}
      {editCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg w-[95%] max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400">
              Update Course
            </h2>

            <div className="grid gap-3">
              <input
                value={editCourse.title ?? ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, title: e.target.value })
                }
                className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Course Title"
              />
              <input
                value={editCourse.instructor ?? ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, instructor: e.target.value })
                }
                className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Instructor"
              />
              <input
                value={editCourse.category ?? ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, category: e.target.value })
                }
                className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Category"
              />
              <input
                value={editCourse.duration ?? ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, duration: e.target.value })
                }
                className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Duration"
              />
              <input
                value={editCourse.image ?? ""}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, image: e.target.value })
                }
                className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Course Image URL"
              />
              <input
                value={editCourse.instructorimage ?? ""}
                onChange={(e) =>
                  setEditCourse({
                    ...editCourse,
                    instructorimage: e.target.value,
                  })
                }
                className="border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Instructor Image URL"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditCourse(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 transition"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">Course</th>
              <th className="p-3">Instructor</th>
              <th className="p-3">Instructor_name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Duration</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.length ? (
              courses.map((course) => (
                <CourseRow key={course.id} course={course} />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
