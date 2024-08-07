import { useState } from "react";
import EyeI from "../../assets/icon/eye";
import EyeInv from "../../assets/icon/eyeInv";

const CustomInput = ({
  letIcon,
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
  maxLength,
  autoComplete = "new-password",
  disabled,
}) => {
  const eyeIconVis = <EyeI className="w-5" strokeWidth={2} />;
  const eyeIconInv = <EyeInv className="w-5" strokeWidth={2} />;

  const [icon, setIcon] = useState(eyeIconInv);
  const [inputType, setInputType] = useState("password");

  const iconClick = (e) => {
    e.preventDefault();
    if (inputType === "password") {
      setInputType("text");
      setIcon(eyeIconVis);
    } else {
      setInputType("password");
      setIcon(eyeIconInv);
    }
  };

  return (
    <div className={`flex flex-col mt-3 sm:mt-6 w-full relative ${className2}`}>
      <label className="text-xs font-[600] tracking-wide text-[--gr-1] max-md:max-w-full text-left">
        {label}
      </label>
      <input
        label={label}
        type={letIcon ? inputType : type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete={autoComplete}
        maxLength={maxLength}
        disabled={disabled}
        className={`px-4 py-2.5 mt-1 sm:mt-2.5 text-base font-[300] rounded-md sm:rounded-md border border-solid border-[--border-1] text-[--black-2] max-md:pr-5 w-full autofill:shadow-white autofill:outline-none ${className}`}
      />
      {letIcon && (
        <div
          className={`absolute right-4 top-1/2 text-2xl cursor-pointer text-[--gr-1] ${className3}`}
          onClick={iconClick}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
