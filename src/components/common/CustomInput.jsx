import { useState } from "react";
import EyeI from "../../assets/icon/eye";
import EyeInv from "../../assets/icon/eyeInv";

const CustomInput = ({
  icon,
  iconClick,
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
  className4,
  maxLength,
  autoComplete = "new-password",
  disabled,
  onClick,
}) => {
  const eyeIconVis = <EyeI className="w-5" strokeWidth={2} />;
  const eyeIconInv = <EyeInv className="w-5" strokeWidth={2} />;

  const [eyeIcon, setEyeIcon] = useState(eyeIconInv);
  const [inputType, setInputType] = useState("password");

  const eyeIconClick = (e) => {
    e.preventDefault();
    if (inputType === "password") {
      setInputType("text");
      setEyeIcon(eyeIconVis);
    } else {
      setInputType("password");
      setEyeIcon(eyeIconInv);
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
        onClick={onClick}
        className={`px-4 py-2.5 mt-1 sm:mt-2.5 text-base font-[300] rounded-md sm:rounded-md border border-solid border-[--border-1] text-[--black-2] max-md:pr-5 w-full autofill:shadow-white autofill:outline-none ${className}`}
      />
      {letIcon && !icon && (
        <div
          className={`absolute right-4 top-1/2 text-2xl cursor-pointer text-[--gr-1] ${className3}`}
          onClick={eyeIconClick}
        >
          {eyeIcon}
        </div>
      )}
      {icon && !letIcon && (
        <div className="absolute top-0 right-2 h-full pb-2 flex items-end">
          <div className={`cursor-pointer ${className4}`} onClick={iconClick}>
            {icon}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
