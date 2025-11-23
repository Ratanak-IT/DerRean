"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, AlertTriangle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor_name: string;
  price: number;
  category: string;
  image?: string;
  instructorimage?: string;
  originalprice?: number;
  duration?: string;
}

interface CourseTableProps {
  courses: Course[];
  onDelete: () => void;
}

export default function CourseTable({ courses, onDelete }: CourseTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
  if (!deleteId) return;
  setLoading(true);
  try {
    const res = await fetch(`/api/courses?id=${deleteId}`, { method: "DELETE" });
    const data = await res.json();
    console.log("DELETE response:", data);
    if (!res.ok) throw new Error(data?.error || "Failed to delete course");
    setDeleteId(null);
    onDelete();
  } catch (err) {
    console.error("Delete course error:", err);
  } finally {
    setLoading(false);
  }
};

  const CourseRow = ({ course }: { course: Course }) => (
    <tr className="border-b hover:bg-gray-50 transition duration-200">
      <td className="p-3 flex items-center gap-3">
        {course.image ? (
          <Image src={course.image} alt={course.title ?? "Course image"} width={60} height={40} className="rounded-md object-cover shadow-sm" />
        ) : (
          <div className="w-[60px] h-[40px] bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">No Image</div>
        )}
        <span className="font-medium text-gray-800">{course.title}</span>
      </td>

      <td className="p-3 gap-3">
        {course.instructorimage ? (
          <Image src={course.instructorimage} alt={course.instructor_name ?? "Instructor image"} width={36} height={36} className="rounded-full object-cover" />
        ) : (
          <div className="w-[36px] h-[36px] bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">No Image</div>
        )}
        <span className="text-gray-700">{course.instructor_name}</span>
      </td>

      <td className="p-3">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">{course.category}</span>
      </td>

      <td className="p-3 text-gray-600">{course.duration ?? "-"}</td>

      <td className="p-3">
        <div className="flex flex-col">
          <span className="font-bold text-green-600">${course.price}</span>
          {course.originalprice && <span className="text-xs line-through text-gray-400">${course.originalprice}</span>}
        </div>
      </td>

      <td className="p-3 text-center">
        <button
          onClick={() => setDeleteId(course.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center gap-2 mx-auto transition duration-200"
        >
          <Trash2 size={16} /> Delete
        </button>
      </td>
    </tr>
  );

  return (
    <>
      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" role="dialog" aria-modal="true">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md animate-fadeIn">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={26} />
              <h2 className="text-xl font-bold">Confirm Delete</h2>
            </div>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">Cancel</button>
              <button
                onClick={handleConfirmDelete}
                disabled={loading}
                className={`px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">Course</th>
              <th className="p-3">Instructor</th>
              <th className="p-3">Category</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.length ? courses.map((course) => <CourseRow key={course.id} course={course} />) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">No courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
} 