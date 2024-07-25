const CustomInput = ({
  icon,
  onClick,
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  className,
  className2,
}) => {
  return (
    <div
      className={`flex flex-col mt-6 max-md:max-w-full relative ${className2}`}
    >
      <label className="text-xs font-[600] tracking-wide text-[--black-1] max-md:max-w-full text-left">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`px-4 py-3 mt-2.5 text-base font-[300] rounded-lg border border-solid border-[--border-1] text-[--gr-1] max-md:pr-5 max-md:max-w-full ${className}`}
      />
      <div
        className="absolute right-4 top-1/2 text-2xl cursor-pointer text-[--black-1]"
        onClick={onClick}
      >
        {icon}
      </div>
    </div>
  );
};

export default CustomInput;
