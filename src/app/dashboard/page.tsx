"use client";

import { useState } from "react";
import AddCourseForm from "../api/component/AddCourseForm";
import CourseTable from "../api/component/Coursetable";
import { supabase } from "@/lib/supabaseClient";
import DashboardStats from "@/components/dashboardstate/DashboardStats";

interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  category: string;
  image?: string;
  instructor_image?: string;
  original_price?: number;
  duration?: string;
}

export default function DashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [ ] = useState(false);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (!error) setCourses(data || []);
  };

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from("admin_users")
      .select("username, password")
      .eq("username", usernameInput)
      .single();

    if (error || !data) {
      alert("Invalid username or password");
      return;
    }

    if (passwordInput === data.password) {
      setAuthenticated(true);
      fetchCourses();
    } else {
      alert("Invalid username or password");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800 space-y-4">
        <h2 className="text-[30px] dark:text-white font-bold">Enter Dashboard Credentials</h2>

        <input
          type="text"
          placeholder="Username"
          className="border px-4 py-2 dark:text-gray-100 rounded w-64"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded w-64 dark:text-white"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-6 dark:bg-gray-800">
      <h1 className="text-2xl font-bold mt-[60px] dark:text-white">Course Dashboard</h1>

      {/* Add Course Button */}

      <AddCourseForm onAdd={fetchCourses} />

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Course Table */}
      <CourseTable courses={courses} onDelete={fetchCourses} />
    </div>
  );
}
