import React from "react";

interface ButtonComponentProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onClick,
  children,
  className = "",
  variant = "primary",
  type = "button",
}) => {
  const baseStyles = `
    w-full px-4 py-2 rounded font-medium transition-colors duration-300 border
    focus:outline-none focus:ring-2 focus:ring-offset-1
  `;

  const variants = {
    primary: `
      bg-primary text-secondary border-primary
      hover:bg-transparent hover:!text-primary hover:border-primary
      dark:bg-secondary dark:text-primary dark:border-primary
      dark:hover:bg-transparent dark:hover:!text-secondary dark:hover:border-secondary
      focus:ring-primary dark:focus:ring-primary
    `,
    secondary: `
      bg-secondary text-primary border-secondary
      hover:bg-secondary-dark hover:text-primary hover:border-secondary-dark
      dark:bg-secondary dark:text-primary dark:border-secondary
      dark:hover:bg-secondary-dark dark:hover:text-primary dark:hover:border-secondary-dark
      focus:ring-secondary dark:focus:ring-secondary
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
