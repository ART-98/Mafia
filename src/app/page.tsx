"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [godName, setGodName] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (!godName.trim()) return;
    router.push(`/create-game?god=${encodeURIComponent(godName)}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 gap-6">
      <h1 className="text-3xl font-bold">مافیا - ورود گاد</h1>
      <input
        type="text"
        placeholder="نام گاد"
        value={godName}
        onChange={(e) => setGodName(e.target.value)}
        className="border border-gray-300 p-2 rounded w-64"
      />
      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        شروع بازی
      </button>
    </main>
  );
}
