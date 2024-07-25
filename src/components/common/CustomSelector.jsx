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
  isDisabled,
}) => {
  return (
    <div className={`flex flex-col mt-3 sm:mt-6 w-full relative ${className2}`}>
      <label className="text-xs font-[600] tracking-wide text-[--black-1] max-md:max-w-full text-left z-[999]">
        {label}
      </label>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        className={`mt-1 sm:mt-2.5 text-base font-[300] ${className}`}
        isDisabled={isDisabled}
        isSearchable={isSearchable !== undefined ? isSearchable : true}
        styles={{
          control: (provided, state) => ({
            ...provided,
            boxShadow: "none",
            border: "1px solid var(--border-1)",
            backgroundColor: "var(--white-1)",
            color: "--gr-1",
            borderRadius: ".375rem",
            padding: "4px 0px",
            "@media (min-width: 640px)": {
              padding: "6px 0px",
              borderRadius: ".5rem",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor:
              state.label === value.label ? "var(--light-1)" : "var(--white-1)",
            color:
              state.label === value.label ? "var(--black-2)" : "var(--black-1)",
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: "var(--gr-1)",
          }),
          menu: (provided, state) => ({
            ...provided,
            backgroundColor: "var(--white-1)",
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
          }),
        }}
      />
    </div>
  );
};

export default CustomSelect;
