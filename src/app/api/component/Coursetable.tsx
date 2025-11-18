"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, AlertTriangle } from "lucide-react";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  category: string;
  image?: string;
  instructorImage?: string;
  originalPrice?: number;
  duration?: string;
}

interface CourseTableProps {
  courses: Course[];
  onDelete: () => void;
}

export default function CourseTable({ courses, onDelete }: CourseTableProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/courses?id=${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    onDelete();
  };

  return (
    <>
      {/* 🔥 Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md animate-fadeIn">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={26} />
              <h2 className="text-xl font-bold">Confirm Delete</h2>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this course? This action cannot be undone.
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
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔵 Courses Table */}
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
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="p-3 flex items-center gap-3">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={60}
                      height={40}
                      className="rounded-md shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-[60px] h-[40px] bg-gray-300 rounded-md"></div>
                  )}
                  <span className="font-medium">{course.title}</span>
                </td>

                <td className="p-3 flex items-center gap-3">
                  {course.instructorImage ? (
                    <Image
                      src={course.instructorImage}
                      alt={course.instructor}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[36px] h-[36px] bg-gray-300 rounded-full"></div>
                  )}
                  <span>{course.instructor}</span>
                </td>

                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {course.category}
                  </span>
                </td>

                <td className="p-3">{course.duration ?? "-"}</td>

                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-green-600">${course.price}</span>
                    {course.originalPrice && (
                      <span className="text-xs line-through text-gray-500">
                        ${course.originalPrice}
                      </span>
                    )}
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
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <p className="text-center py-6 text-gray-500">No courses found.</p>
        )}
      </div>
    </>
  );
}
