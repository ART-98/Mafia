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
    <header className="bg-gray-400 p-4 text-center flex justify-between items-center text-dark dark:text-light">
      <div className="flex gap-1 text-sm sm:text-base">
        <div>{time || "..."}</div> | 
        <div>{persianDate}</div>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
