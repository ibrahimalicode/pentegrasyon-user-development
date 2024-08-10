const CustomToggle = ({ label, checked, onClick, className, className2 }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onClick={onClick}
        className="sr-only peer"
      />
      <div
        className={`relative w-[53px] h-[28px] bg-[--light-4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[--white-1] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[--white-1] after:border-[--light-4] after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[--primary-2] ${className}`}
      ></div>

      <span className={`ml-4 text-sm font-medium text-[--gr-1] ${className2}`}>
        {label}
      </span>
    </label>
  );
};

export default CustomToggle;
