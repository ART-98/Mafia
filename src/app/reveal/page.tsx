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

  if (!players.length) return <p className="p-4">هیچ بازیکنی پیدا نشد.</p>;

  const current = players[currentIndex];

  const handleNext = () => {
    setShowRole(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">
        نمایش نقش بازیکن {currentIndex + 1} از {players.length}
      </h2>
      {!showRole ? (
        <button
          onClick={() => setShowRole(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
        >
          نمایش نقش {current.name}
        </button>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-xl">
            نام بازیکن: <strong>{current.name}</strong>
          </p>
          <p className="text-2xl font-bold text-purple-700">
            نقش: {current.role.name}
          </p>
          <p className="text-lg">تیم: {current.role.team}</p>
          {currentIndex < players.length - 1 ? (
            <button
              onClick={handleNext}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
            >
              رفتن به بازیکن بعدی
            </button>
          ) : (
            <p className="mt-6 text-green-700 text-lg">
              همه نقش‌ها نمایش داده شدند.
            </p>
          )}
        </div>
      )}
      {currentIndex === players.length - 1 && showRole && (
        <button
          onClick={() => (window.location.href = "/night-actions")}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          شروع فاز شب
        </button>
      )}
    </main>
  );
}
