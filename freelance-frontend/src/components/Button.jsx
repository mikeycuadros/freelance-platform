
import React from "react";

export function Button({ children, className, variant, ...props }) {
  const baseStyles = "px-6 py-3 font-medium rounded-md transition-all duration-300";
  const variants = {
    primary: "bg-purple-800 text-white hover:bg-purple-900",
    outline: "border-2 border-purple-800 text-purple-800 hover:bg-purple-900 hover:text-white",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
