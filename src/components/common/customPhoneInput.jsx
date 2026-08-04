import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "../../lib/utils";
import { FIELD_BASE, FIELD_LABEL, FIELD_WRAPPER } from "./fieldStyles";

const CustomPhoneInput = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  className,
  className2,
  autoComplete = "new-password",
  className5,
  disabled,
}) => {
  const handleChange = (value) => {
    if (!value.startsWith("90")) {
      if (value.startsWith("9")) {
        value = "90" + value.slice(1);
      } else if (value.startsWith("0")) {
        value = "9" + value.slice(1);
      } else {
        value = "90" + value;
      }
    }

    onChange(value);
  };

  return (
    <div className={cn(FIELD_WRAPPER, className2)}>
      <style>{`
        .hide-flag .flag-dropdown,
        .hide-flag .selected-flag {
          display: none;
        }

        .hide-flag .form-control {
          padding-left: 0;
        }
      `}</style>
      {label && <label className={cn(FIELD_LABEL, className5)}>{label}</label>}
      <PhoneInput
        country={"tr"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        containerClass="hide-flag"
        maxlength={14}
        minLength={14}
        disabled={disabled}
        inputProps={{
          required: required,
          pattern: "\\+90\\s[0-9]{3}\\s[0-9]{3}\\s[0-9]{2}\\s[0-9]{2}",
          autoComplete: autoComplete,
          className: cn(FIELD_BASE, className),
        }}
      />
    </div>
  );
};

export default CustomPhoneInput;
