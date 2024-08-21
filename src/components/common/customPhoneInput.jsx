import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  className,
  className2,
  autoComplete = "new-password",
}) => {
  // const [phone, setPhone] = useState(value);

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

    // setPhone(value);
    onChange(value);
  };

  // useEffect(() => {
  //   handleChange(value);
  // }, [value]);

  return (
    <div className={`flex flex-col mt-3 sm:mt-6 w-full relative ${className2}`}>
      <style>{`
        .hide-flag .flag-dropdown,
        .hide-flag .selected-flag {
          display: none;
        }

        .hide-flag .form-control {
          padding-left: 0;
        }
      `}</style>
      <label className="text-xs font-[600] tracking-wide text-[--gr-1] max-md:max-w-full text-left">
        {label}
      </label>
      <PhoneInput
        country={"tr"}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        containerClass="hide-flag"
        maxlength={14}
        minLength={14}
        inputProps={{
          required: required,
          autoComplete: autoComplete,
          className: `px-4 py-2.5 mt-1 sm:mt-2.5 text-base font-[300] rounded-md border border-solid border-[--border-1] text-[--black-2] max-md:pr-5 w-full autofill:shadow-white autofill:outline-none ${className}`,
        }}
      />
    </div>
  );
};

export default CustomPhoneInput;
