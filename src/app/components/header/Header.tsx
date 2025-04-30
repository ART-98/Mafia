"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import jalaali from "jalaali-js";

const Header = () => {
  const [time, setTime] = useState<string>("");
  const [persianDate, setPersianDate] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      // Time
      const formattedTime = now.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formattedTime);

      // Date
      const { jy, jm, jd } = jalaali.toJalaali(now);
      setPersianDate(`${jy}/${jm}/${jd}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-secondary-dark dark:bg-gray-800 text-gray-900 dark:text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Time & Date */}
        <div className="flex gap-3 text-sm sm:text-base font-medium text-dark dark:text-light">
          <span>{time || "..."}</span>
          <span className="text-gray-500 dark:text-gray-400">|</span>
          <span>{persianDate}</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
