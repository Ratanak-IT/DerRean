"use client";

import { useState } from "react";
import AddCourseForm from "../api/component/AddCourseForm";
import CourseTable from "../api/component/Coursetable";
import { supabase } from "@/lib/supabaseClient";

interface Course {
  id: string;
  title: string;
  instructor_name: string;
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
  const [open, setOpen] = useState(false);

  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) console.error(error);
    else setCourses(data || []);
  };

  const handleLogin = () => {
    // Set your static username/password here
    const correctUsername = "admin";
    const correctPassword = "admin1234";

    if (usernameInput === correctUsername && passwordInput === correctPassword) {
      setAuthenticated(true);
      fetchCourses();
    } else {
      alert("Invalid username or password");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h2 className="text-2xl font-bold">Enter Dashboard Credentials</h2>
        <input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="border px-4 py-2 rounded w-64"
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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mt-[50px]">Course Dashboard</h1>
      <button onClick={() => setOpen(true)} className="btn-primary">Add Course</button>

      {open && (
        <AddCourseForm
          onAdd={() => fetchCourses()}
          onClose={() => setOpen(false)}
        />
      )}

      <CourseTable courses={courses} onDelete={fetchCourses} />
    </div>
  );
}
