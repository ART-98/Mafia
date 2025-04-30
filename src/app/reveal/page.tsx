"use client";
import { useState, useEffect } from "react";
import ButtonComponent from "../components/button/Button";

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
      <div className="min-h-screen flex items-center justify-center bg-light dark:bg-primary-dark text-dark dark:text-light">
        <p className="text-lg">هیچ بازیکنی پیدا نشد.</p>
      </div>
    );
  }

  const current = players[currentIndex];

  const handleNext = () => {
    setShowRole(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-secondary dark:bg-gray-700 text-dark dark:text-light transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">
        نمایش نقش بازیکن {currentIndex + 1} از {players.length}
      </h2>

      {!showRole ? (
        <ButtonComponent
          onClick={() => setShowRole(true)}
          variant="primary"
          className="!w-fit"
        >
          نمایش نقش {current.name}
        </ButtonComponent>
      ) : (
        <div className="bg-secondary-dark dark:bg-primary rounded-xl p-6 shadow-lg w-full max-w-sm text-center space-y-4 transition-colors">
          <p className="text-lg">
            نام بازیکن : <strong>{current.name}</strong>
          </p>
          <p className="text-xl font-bold text-primary dark:text-secondary">
            نقش: {current.role.name}
          </p>
          <p className="text-base">
            تیم:
            <strong> {current.role.team}</strong>
          </p>

          {currentIndex < players.length - 1 ? (
            <ButtonComponent onClick={handleNext} variant="primary">
              رفتن به بازیکن بعدی
            </ButtonComponent>
          ) : (
            <p className="mt-4 text-green-700 dark:text-green-400 font-semibold">
              همه نقش‌ها نمایش داده شدند.
            </p>
          )}
        </div>
      )}

      {currentIndex === players.length - 1 && showRole && (
        <ButtonComponent
          onClick={() => (window.location.href = "/night-actions")}
          variant="primary"
          className="!w-fit mt-4"
        >
          شروع فاز شب
        </ButtonComponent>
      )}
    </div>
  );
}
