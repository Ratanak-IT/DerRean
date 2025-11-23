'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);

    localStorage.setItem("token", data.session?.access_token || "");
    setIsLoggedIn(true);

    // show toast success
    toast.success("Login successful 🎉");

    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 max-w-md py-20">
      {/* Toaster component */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={onLogin} className="flex flex-col gap-4">
        <input
          className="p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded py-2">
          Login
        </button>
      </form>
    </div>
  );
}
