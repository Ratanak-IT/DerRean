"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Email and password are required");
    }

    setLoading(true);

    try {
      // TODO: Replace with your real login API
      const res = await fetch("http://your-api-url/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setError(data?.message || "Login failed");
      }

      // success
      alert("Login successful!");
      setLoading(false);

      // redirect to homepage
      window.location.href = "/";
    } catch (err) {
  console.error(err);
  setLoading(false);
  setError("Something went wrong. Try again later.");
}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
        {/* Header */}
        <h2 className="text-xl font-bold mb-1">Login</h2>
        <p className="text-gray-500 mb-4 text-sm">
          Login to your account to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="w-full mt-1 border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full mt-1 border rounded-md p-2 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm border border-red-400 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md p-2 hover:bg-gray-900 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-4">
          <button className="w-full border border-gray-300 rounded-md p-2 flex items-center justify-center gap-2 hover:bg-gray-100">
            <Eye size={18} /> {/* replace with Chrome icon if needed */}
            Login with Google
          </button>
        </div>

        {/* Link to Register */}
        <div className="mt-4 text-center text-sm">
          Do not have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
