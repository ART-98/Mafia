import React, { useState } from "react";

interface InputComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  labelStyle?: string;
  className?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  onChange,
  placeholder,
  error = "",
  labelStyle = "",
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const showFloating = isFocused || value.length > 0;

  return (
    <div className={`relative w-full text-right ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=""
        className={`
          w-full p-2 pt-5 rounded border
          bg-secondary dark:bg-transparent
          text-primary dark:text-secondary
          placeholder-transparent
          focus:outline-none focus:ring focus:ring-primary dark:focus:ring-secondary
          ${
            error
              ? "border-error dark:border-secondary"
              : "border-primary-dark dark:border-secondary"
          }
        `}
      />
      <label
        className={`
          absolute right-2 top-1 text-sm transition-all duration-200 pointer-events-none
          ${
            showFloating
              ? `text-xs !-top-2.5 px-1 ${labelStyle}`
              : "top-4 text-primary-light dark:text-secondary"
          }
          ${
            error
              ? "text-error dark:text-secondary"
              : "text-primary-light dark:text-secondary"
          }
        `}
      >
        {placeholder}
      </label>
      {error && (
        <p className="text-xs text-error dark:text-secondary mt-2 pr-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
