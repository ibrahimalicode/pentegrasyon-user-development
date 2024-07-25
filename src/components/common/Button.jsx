/**
 * This code was generated by Builder.io.
 */
import React from "react";

function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
}) {
  const baseClasses =
    "px-7 py-3 text-xl font-bold leading-5 text-center whitespace-nowrap rounded-md max-md:px-5 max-md:max-w-full";
  const variantClasses =
    variant === "primary"
      ? "text-white bg-indigo-600"
      : "text-black border border-solid border-zinc-500";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
