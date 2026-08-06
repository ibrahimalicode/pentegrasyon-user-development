import { cn } from "../../lib/utils";
import { FIELD_BASE, FIELD_LABEL, FIELD_WRAPPER } from "./fieldStyles";

const CustomTextarea = ({
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
  autoComplete = "new-password",
}) => {
  return (
    <div className={cn(FIELD_WRAPPER, className2)}>
      {label && <label className={FIELD_LABEL}>{label}</label>}
      <div className="relative w-full">
        <textarea
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
          // Same treatment as FIELD_BASE, but multi-line instead of h-9.
          className={cn(FIELD_BASE, "h-24 py-2 resize-y", className)}
        />
        {icon && (
          <div
            className={cn(
              "absolute right-2 top-2 cursor-pointer text-[--gr-3] hover:text-[--black-3] transition-colors",
              className3
            )}
            onClick={onClick}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTextarea;
