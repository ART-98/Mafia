import React, { useState, useEffect, useRef } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectOptionProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectOption({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
}: SelectOptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Select Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 rounded border bg-transparent text-gray-700 cursor-pointer flex justify-between items-center dark:bg-gray-700 dark:text-secondary"
      >
        <span>
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M4 4L6 6L8 4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute w-full mt-1 max-h-60 overflow-auto rounded-md border bg-secondary text-gray-700 shadow-lg z-10 dark:bg-gray-700 dark:text-secondary dark:border-secondary">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 cursor-pointer transition-colors 
                ${
                  value === opt.value
                    ? "bg-primary text-secondary dark:bg-primary dark:text-secondary hover:bg-primary-light"
                    : "hover:bg-gray-200 dark:hover:bg-primary-light dark:hover:text-gray-700"
                }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
