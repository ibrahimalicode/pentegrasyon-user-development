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
        onChange={onChange}
        placeholder={placeholder}
        containerClass="hide-flag"
        inputProps={{
          required: required,
          autoComplete: autoComplete,
          className: `px-4 py-2.5 mt-1 sm:mt-2.5 text-base font-[300] rounded-md sm:rounded-md border border-solid border-[--border-1] text-[--black-2] max-md:pr-5 w-full autofill:shadow-white autofill:outline-none ${className}`,
        }}
      />
    </div>
  );
};

export default CustomPhoneInput;
