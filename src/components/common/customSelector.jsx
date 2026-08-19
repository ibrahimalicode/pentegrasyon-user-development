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

  // Some callers (formatLisansPackages) build the option label as an HTML
  // string — a styled row with package name, duration and price. Those must
  // go through dangerouslySetInnerHTML or the dropdown prints the literal
  // markup, which is exactly what happened when this component was rebuilt
  // without formatOptionLabel.
  const isHtmlLabel = (l) => typeof l === "string" && l.trim().startsWith("<");

  const formatOptionLabel = (option) =>
    isHtmlLabel(option?.label) ? (
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: option.label }}
      />
    ) : (
      option?.label
    );

  const filterOption = (option, inputValue) => {
    // HTML labels would match on class names; search their plain value.
    const haystack = isHtmlLabel(option.label)
      ? String(option.data?.value ?? "")
      : option.label;
    return normalizeTurkish(haystack).includes(normalizeTurkish(inputValue));
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
        formatOptionLabel={formatOptionLabel}
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
