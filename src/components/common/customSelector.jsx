import Select from "react-select";
import { cn } from "../../lib/utils";
import { FIELD_LABEL, FIELD_WRAPPER, SELECT_STYLES } from "./fieldStyles";

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
    <div className={cn(FIELD_WRAPPER, className2)}>
      {label && <label className={FIELD_LABEL}>{label}</label>}
      <Select
        value={value}
        onChange={onChange}
        options={options}
        required={required}
        className={cn("text-sm", className)}
        isDisabled={disabled}
        filterOption={filterOption}
        isSearchable={isSearchable !== undefined ? isSearchable : true}
        menuPlacement={menuPlacement || "bottom"}
        styles={{
          ...SELECT_STYLES,
          control: (provided, state) => ({
            ...SELECT_STYLES.control(provided, state),
            ...style,
          }),
          option: (provided, state) => ({
            ...SELECT_STYLES.option(provided, state),
            ...optionStyle,
          }),
          singleValue: (provided, state) => ({
            ...SELECT_STYLES.singleValue(provided, state),
            ...singleValueStyle,
          }),
          input: (provided, state) => ({
            ...SELECT_STYLES.input(provided, state),
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
            bottom: 0,
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
