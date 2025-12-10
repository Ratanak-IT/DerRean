"use client";

import { Eye, EyeOff, Chrome } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const { setIsLoggedIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email/password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Email and password are required");

    setLoading(true);
    try {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supabaseError) {
        setLoading(false);
        return setError(supabaseError.message);
      }

      localStorage.setItem("token", data.session?.access_token || "");
      setIsLoggedIn(true);

      toast.success("Login successful 🎉");
      setLoading(false);

      router.push("/");
    } catch (_err) {
      console.error(_err);
      setLoading(false);
      setError("Something went wrong. Try again later.");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const { error: supabaseError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_APP_URL,
        },
      });

      if (supabaseError) {
        setLoading(false);
        return setError(supabaseError.message);
      }
    } catch (_err) {
      console.error(_err);
      setLoading(false);
      setError("Google login failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
  <Toaster position="top-right" reverseOrder={false} />

  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-sm">
    <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Login</h2>
    <p className="text-gray-500 dark:text-gray-300 mb-4 text-sm">
      Login to your account to continue
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="m@example.com"
          className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="w-full border rounded-md p-2 pr-10 focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm border border-red-400 bg-red-50 p-2 rounded-md">
          {error}
        </div>
      )}

      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-black dark:bg-gray-900 text-white rounded-md p-2 hover:bg-gray-900 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

    {/* Google Login */}
    <div className="mt-4">
      <button
        onClick={handleGoogleLogin}
        className="w-full dark:text-white border border-gray-300 rounded-md p-2 flex items-center justify-center gap-2 
                   hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        disabled={loading}
      >
        <Chrome size={18} />
        Login with Google
      </button>
    </div>

    {/* Redirect */}
    <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
      Do not have an account?{" "}
      <Link href="/register" className="text-blue-600 hover:underline">
        Create one
      </Link>
    </div>
  </div>
</div>
  );
}
