"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputComponent from "./components/input/Input";
import ButtonComponent from "./components/button/Button";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6 bg-secondary text-dark dark:bg-gray-700 dark:text-light transition-colors">
      <div className="bg-secondary border border-primary dark:bg-primary rounded shadow p-6 w-full max-w-md text-center dark:border-secondary">
        <h1 className="text-3xl font-bold mb-4 text-primary-dark dark:text-secondary-light">
          ورود
        </h1>

        {/* <input
          type="text"
          placeholder="نام گاد"
          value={godName}
          onChange={(e) => setGodName(e.target.value)}
          className="w-full p-2 rounded border border-primary-dark dark:border-secondary bg-secondary dark:bg-primary-light text-dark dark:text-secondary placeholder:text-primary-light dark:placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary"
        /> */}
        <InputComponent
          value={godName}
          onChange={(e) => setGodName(e.target.value)}
          placeholder="نام گاد"
          className=""
          error={error}
          labelStyle="bg-secondary dark:bg-primary"
        />
        <ButtonComponent
          onClick={handleStart}
          variant="primary"
          className="mt-3"
        >
          شروع بازی
        </ButtonComponent>
      </div>
    </div>
  );
}
