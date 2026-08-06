function Button({ text, icon, onClick, className, disabled, type }) {
  return (
    <button
      className={`flex items-center gap-1.5 py-2 whitespace-nowrap font-medium text-[--primary-1] px-3.5 rounded-lg text-sm border border-solid border-[--primary-1] transition-colors hover:bg-[--light-1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary-1] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text} {icon}
    </button>
  );
}

export default Button;
