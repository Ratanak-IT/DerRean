"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Eye, EyeOff, Chrome } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      toast.success("Account created successfully 🎉 Redirecting to login...");
      setLoading(false);
      router.push("/login");
    } catch (_err) {
      console.error(_err);
      setError("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: process.env.NEXT_PUBLIC_APP_URL },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      }
    } catch (_err) {
      console.error(_err);
      setError("Google registration failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Register</h2>
        <p className="text-gray-500 dark:text-gray-300 mb-4 text-sm">
          Create a new account to continue
        </p>

        {error && (
          <div className="text-red-600 text-sm border border-red-400 bg-red-50 p-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Your full name"
              className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full border rounded-md p-2 pr-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white rounded-md p-2 hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* OR */}
        <div className="mt-4">
          <button
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full dark:text-white border border-gray-300 rounded-md p-2 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <Chrome size={18} /> Continue with Google
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
