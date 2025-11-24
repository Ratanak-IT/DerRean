'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Chrome } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email/password registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      toast.success("Account created successfully 🎉");
      setLoading(false);
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again later.");
      setLoading(false);
    }
  };

  // Google registration/login
  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`, // redirect after login
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }

      // Supabase will handle redirect automatically
    } catch (err) {
      console.error(err);
      toast.error("Google sign up failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Register</h2>
        <p className="text-gray-500 dark:text-gray-300 mb-6 text-sm">
          Create a new account to continue
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-2 border rounded-md w-full pr-10 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-2 w-full disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* OR */}
        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          <span className="text-gray-400 dark:text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google registration */}
        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full border border-gray-300 rounded-md p-2 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          <Chrome size={18} /> Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
