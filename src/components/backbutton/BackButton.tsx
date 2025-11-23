"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="text-sm flex items-center gap-2 hover:underline"
      onClick={() => router.push("/course")}
    >
      ← Back
    </button>
  );
}
