const CustomInput = ({
  icon,
  onClick,
  label,
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
  required,
  className,
  className2,
  className3,
}) => {
  return (
    <div className={`flex flex-col mt-3 sm:mt-6 w-full relative ${className2}`}>
      <label className="text-xs font-[600] tracking-wide text-[--black-1] max-md:max-w-full text-left">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`px-4 sm:py-3 mt-1 sm:mt-2.5 text-base font-[300] rounded-md sm:rounded-lg border border-solid border-[--border-1] text-[--gr-1] max-md:pr-5 w-full autofill:shadow-white autofill:outline-none ${className}`}
      />
      <div
        className={`absolute right-4 top-1/2 text-2xl cursor-pointer text-[--gr-1] ${className3}`}
        onClick={onClick}
      >
        {icon}
      </div>
    </div>
  );
};

export default CustomInput;
