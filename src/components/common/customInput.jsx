import { useState } from "react";
import EyeI from "../../assets/icon/eye";
import EyeInv from "../../assets/icon/eyeInv";
import { maxInput } from "../../utils/utils";
import { cn } from "../../lib/utils";
import { FIELD_BASE, FIELD_LABEL, FIELD_WRAPPER } from "./fieldStyles";

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
  minLength,
  autoComplete = "new-password",
  disabled,
  onClick,
  readOnly,
  onFocus,
  onBlur,
  inputRef,
  className5,
  pattern,
}) => {
  // Icon size is bound to the control size: a 36px field takes a 16px icon.
  const eyeIconVis = <EyeI className="size-4" strokeWidth={1.5} />;
  const eyeIconInv = <EyeInv className="size-4" strokeWidth={1.5} />;

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

  const hasTrailing = letIcon || icon;

  return (
    <div className={cn(FIELD_WRAPPER, className2)}>
      {label && <label className={cn(FIELD_LABEL, className5)}>{label}</label>}

      {/* Relative to the control itself so trailing icons center exactly,
          regardless of whether a label is rendered above. */}
      <div className="relative w-full">
        <input
          ref={inputRef}
          type={letIcon ? inputType : type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(maxInput(e))}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          onClick={onClick}
          readOnly={readOnly}
          onFocus={onFocus}
          onBlur={onBlur}
          pattern={pattern}
          className={cn(FIELD_BASE, hasTrailing && "pr-9", className)}
        />

        {letIcon && !icon && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Şifreyi göster/gizle"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 text-[--gr-3] hover:text-[--black-3] transition-colors",
              className3
            )}
            onClick={eyeIconClick}
          >
            {eyeIcon}
          </button>
        )}

        {icon && !letIcon && (
          <div
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[--gr-3] hover:text-[--black-3] transition-colors",
              className4
            )}
            onClick={iconClick}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
