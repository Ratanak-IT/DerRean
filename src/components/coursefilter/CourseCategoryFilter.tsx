"use client";

import { useState } from "react";
import { Course } from "@/types/course";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface CourseCategoryFilterProps {
  courses: Course[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CourseCategoryFilter({
  courses,
  selectedCategory,
  onCategoryChange,
}: CourseCategoryFilterProps) {
  const categories = Array.from(new Set(courses.map((c) => c.category).filter(Boolean)));
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (cat: string) => {
    onCategoryChange(cat);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
        Filter by Category
      </label>

      <div
        className="cursor-pointer relative rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md border border-gray-300 dark:border-gray-700 px-4 py-3 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedCategory || "All Categories"}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-300 dark:border-gray-700 max-h-60 overflow-y-auto">
          <li
            className="px-4 py-2 hover:bg-blue-500 hover:text-white dark:text-white cursor-pointer rounded-2xl"
            onClick={() => handleSelect("All")}
          >
            All Categories
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              className="px-4 py-2 hover:bg-blue-500 dark:text-white hover:text-white cursor-pointer rounded-2xl"
              onClick={() => handleSelect(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
