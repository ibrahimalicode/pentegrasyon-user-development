import React from "react";
import Select from "react-select";

const CustomSelect = ({
  label,
  value,
  isSearchable,
  options,
  onChange,
  className,
  className2,
  disabled,
  required,
  style,
  inputStyle,
  optionStyle,
  singleValueStyle,
  menuPlacement,
}) => {
  const formatOptionLabel = ({ label }) => (
    <div dangerouslySetInnerHTML={{ __html: label }} />
  );

  const normalizeTurkish = (str = "") =>
    str
      .toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/i̇/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u");

  const filterOption = (option, inputValue) => {
    const label = normalizeTurkish(option.label);
    const input = normalizeTurkish(inputValue);
    return label.includes(input);
  };

  return (
    <div className={`flex flex-col mt-3 sm:mt-6 w-full relative ${className2}`}>
      <label className="text-xs font-[600] tracking-wide text-[--gr-1] max-md:max-w-full text-left">
        {label}
      </label>
      <Select
        // menuIsOpen={true}
        value={value}
        onChange={onChange}
        options={options}
        required={required}
        className={`mt-1 sm:mt-2 text-base ${className}`}
        isDisabled={disabled}
        filterOption={filterOption}
        isSearchable={isSearchable !== undefined ? isSearchable : true}
        formatOptionLabel={formatOptionLabel}
        menuPlacement={menuPlacement || "bottom"}
        styles={{
          control: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            border: state.isFocused
              ? "1px solid var(--primary-1)"
              : "1px solid var(--border-1)",
            boxShadow: state.isFocused
              ? "0 0 0 3px rgb(79 70 229 / 0.15)"
              : "none",
            "&:hover": { borderColor: "var(--primary-1)" },
            backgroundColor: "var(--white-1)",
            borderRadius: ".5rem",
            padding: "4px 0px",
            transition: "box-shadow 150ms, border-color 150ms",
            ...style,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor:
              state.label === value.label
                ? "var(--light-1)"
                : state.isFocused
                  ? "var(--light-3)"
                  : "var(--white-1)",
            color:
              state.label === value.label ? "var(--primary-1)" : "var(--black-1)",
            cursor: "pointer",
            ...optionStyle,
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: "var(--black-2)",
            ...singleValueStyle,
          }),
          menu: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--white-1)",
            border: "1px solid var(--border-1)",
            borderRadius: ".5rem",
            overflow: "hidden",
            boxShadow:
              "0 4px 6px -1px rgb(15 23 42 / 0.07), 0 2px 4px -2px rgb(15 23 42 / 0.06)",
            zIndex: "9999",
          }),
          menuList: (provided, state) => ({
            ...provided,
            maxHeight: "16rem",
            borderBottomLeftRadius: ".3rem",
            borderBottomRightRadius: ".3rem",
            paddingBottom: "0",
          }),
          input: (provided, state) => ({
            ...provided,
            color: "var(--black-1)",
            ...inputStyle,
          }),
        }}
      />
      {required && !value?.value && (
        <input
          type="text"
          required={required}
          value=""
          onChange={() => {}}
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            opacity: 0,
            width: "100%",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default CustomSelect;
