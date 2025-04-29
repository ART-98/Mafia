"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [godName, setGodName] = useState("");
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleStart = () => {
    if (!godName.trim()) {
      setError("لطفا نام گاد را وارد کنید.");
      return;
    }
    router.push(`/create-game?god=${encodeURIComponent(godName)}`);
  };

  return (
     <div className="flex flex-col items-center justify-center min-h-screen p-6  gap-6">
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">ورود</h1>

        <input
          type="text"
          placeholder="نام گاد"
          value={godName}
          onChange={(e) => setGodName(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <button
          onClick={handleStart}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors duration-300"
        >
          شروع بازی
        </button>
      </div>
    </div>
  );
}
