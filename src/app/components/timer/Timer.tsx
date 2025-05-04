"use client";

import { useState, useEffect, useRef } from "react";
import ButtonComponent from "../../components/button/Button";
import toast from "react-hot-toast";

interface TimerProps {}

const Timer: React.FC<TimerProps> = ({}) => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const timeOptions = [30, 45, 60, 180];

  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedSoundRef = useRef(false);

  useEffect(() => {
    alarmAudioRef.current = new Audio("/sounds/alarm.mp3");
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isTimerRunning && timeLeft !== null && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === null) return null;
          const newTime = prevTime - 1;

          if (newTime <= 3 && !hasPlayedSoundRef.current) {
            hasPlayedSoundRef.current = true;
            if (alarmAudioRef.current) {
              alarmAudioRef.current.play().catch((err) => {
                console.error("Failed to play alarm:", err);
              });
            }
          }

          if (newTime <= 0) {
            toast.error("تایمر به پایان رسید!");
            clearInterval(timer!);
            return 0;
          }

          return newTime;
        });
      }, 1000);
    } else if (!isTimerRunning && timeLeft !== null && timeLeft > 0) {
      clearInterval(timer!);
    }

    return () => clearInterval(timer!);
  }, [isTimerRunning, timeLeft]);

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    setTimeLeft(time);
    setIsTimerRunning(true);
    hasPlayedSoundRef.current = false;
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(null);
  };

  return (
    <div className="bg-secondary-dark dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-4">انتخاب تایمر</h2>
      <div className="flex gap-3 mb-4">
        {timeOptions.map((time) => (
          <ButtonComponent
            key={time}
            variant={selectedTime === time ? "primary" : "secondary"}
            onClick={() => handleTimeSelect(time)}
          >
            {time} ثانیه
          </ButtonComponent>
        ))}
      </div>

      {isTimerRunning && timeLeft !== null && (
        <div className="font-semibold text-xl">
          تایمر :{" "}
          <strong className="text-error animate-pulse">{timeLeft} ثانیه</strong>
        </div>
      )}

      {!isTimerRunning && timeLeft === null && (
        <div className="text-gray-500">لطفاً زمان را انتخاب کنید.</div>
      )}

      <div className="mt-4">
        <ButtonComponent variant="secondary" onClick={handleStopTimer}>
          متوقف کردن تایمر
        </ButtonComponent>
      </div>
    </div>
  );
};

export default Timer;
