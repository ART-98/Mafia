"use client";
import { useState, useEffect } from "react";

interface AssignedPlayer {
  id: string;
  name: string;
  role: {
    id: string;
    name: string;
    team: string;
  };
}

export default function RevealPage() {
  const [players, setPlayers] = useState<AssignedPlayer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRole, setShowRole] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("assignedPlayers");
    if (data) {
      setPlayers(JSON.parse(data));
    }
  }, []);

  if (!players.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-800 dark:text-white text-lg">
          هیچ بازیکنی پیدا نشد.
        </p>
      </div>
    );
  }
  const current = players[currentIndex];

  const handleNext = () => {
    setShowRole(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">
        نمایش نقش بازیکن {currentIndex + 1} از {players.length}
      </h2>

      {!showRole ? (
        <button
          onClick={() => setShowRole(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg shadow transition"
        >
          نمایش نقش {current.name}
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow w-full max-w-sm text-center space-y-4">
          <p className="text-xl">
            نام بازیکن: <strong>{current.name}</strong>
          </p>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            نقش: {current.role.name}
          </p>
          <p className="text-lg">تیم: {current.role.team}</p>

          {currentIndex < players.length - 1 ? (
            <button
              onClick={handleNext}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
            >
              رفتن به بازیکن بعدی
            </button>
          ) : (
            <p className="mt-4 text-green-700 dark:text-green-400 font-semibold">
              همه نقش‌ها نمایش داده شدند.
            </p>
          )}
        </div>
      )}

      {currentIndex === players.length - 1 && showRole && (
        <button
          onClick={() => (window.location.href = "/night-actions")}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
        >
          شروع فاز شب
        </button>
      )}
    </div>
  );
}
