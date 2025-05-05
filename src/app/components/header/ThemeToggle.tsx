"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 shadow hover:scale-105 transition-transform size-9 flex justify-center items-center relative overflow-hidden"
    >
      {/* Moon Icon */}
      <div
        className={`absolute transition-all duration-500 ${
          isDark ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7.5 7.5 0 0 0 21 12.79z" />
        </svg>
      </div>

      {/* Sun Icon */}
      <div
        className={`absolute transition-all duration-500 ${
          isDark ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M16.97 16.97l1.42 1.42M2 12h2m18 0h2m-3.78-7.78l-1.42 1.42M7.03 16.97l-1.42 1.42" />
          <circle cx={12} cy={12} r={5} />
        </svg>
      </div>
    </button>
  );
}
