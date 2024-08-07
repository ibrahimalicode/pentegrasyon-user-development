import CheckI from "../../assets/icon/check";

const CustomCheckbox = ({
  label,
  checked,
  onChange,
  className,
  className2,
}) => {
  return (
    <label
      className={`max-w-max flex items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`w-6 h-6 flex justify-center items-center border-2 border-[--border-1] rounded-md relative ${
          checked ? "bg-[--primary-2] border-[--primary-2]" : "bg-[--white-1]"
        }`}
      >
        {checked && <CheckI className="h-4 text-[--white-1]" strokeWidth="4" />}
      </span>
      {label && (
        <span
          className={`ml-2 text-[--gr-1] ${className2}`}
          dangerouslySetInnerHTML={{ __html: label }}
        ></span>
      )}
    </label>
  );
};

export default CustomCheckbox;
