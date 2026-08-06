// Canonical form-control styling. Every field primitive (input, select,
// phone, textarea) composes from these so controls line up on a single
// baseline: same height, padding, radius, border and focus treatment.
// Override per call site with the component's className props — they run
// through cn()/twMerge, so later classes win cleanly.

export const FIELD_WRAPPER = "flex flex-col w-full relative mt-3 sm:mt-5";

export const FIELD_LABEL =
  "block text-xs font-semibold tracking-wide text-[--black-3] text-left mb-1.5";

// h-11 (44px) is the shared control height — matches AuthSubmit buttons.
// dark:bg-[--white-2] keeps controls readable against a --white-1 card.
export const FIELD_BASE =
  "h-11 w-full px-3.5 rounded-lg border border-solid border-[--border-1] bg-[--white-1] dark:bg-[--white-2] text-sm text-[--black-2] placeholder:text-[--gr-3] dark:placeholder:text-[--gr-1] outline-none transition-[border-color,box-shadow] focus:border-[--primary-1] focus:ring-2 focus:ring-[--primary-1]/20 disabled:opacity-60 disabled:bg-[--light-3] disabled:cursor-not-allowed";

// react-select needs the same look expressed as style objects.
export const SELECT_STYLES = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "2.75rem",
    height: "2.75rem",
    cursor: "pointer",
    paddingLeft: "0.5rem",
    borderRadius: "0.5rem",
    backgroundColor: "var(--white-1)",
    borderColor: state.isFocused ? "var(--primary-1)" : "var(--border-1)",
    boxShadow: state.isFocused ? "0 0 0 2px rgb(79 70 229 / 0.2)" : "none",
    "&:hover": { borderColor: "var(--primary-1)" },
    transition: "border-color 150ms, box-shadow 150ms",
  }),
  valueContainer: (provided) => ({ ...provided, padding: "0 0.25rem" }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--gr-3)",
    fontSize: "0.875rem",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--black-2)",
    fontSize: "0.875rem",
  }),
  input: (provided) => ({ ...provided, color: "var(--black-2)" }),
  // The default vertical bar before the chevron reads as a foreign artifact
  // next to plain text inputs.
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--gr-3)",
    padding: "0 0.5rem",
    "&:hover": { color: "var(--black-3)" },
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "0.25rem",
    // Size to the longest option rather than to the control, so a narrow
    // control (the orders toolbar time pickers) no longer clips its own
    // options to "20 d". Never narrower than the control, and capped so a
    // long restaurant name can't produce a runaway panel.
    width: "max-content",
    minWidth: "100%",
    maxWidth: "20rem",
    backgroundColor: "var(--white-1)",
    border: "1px solid var(--border-1)",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow:
      "0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.08)",
    zIndex: 9999,
  }),
  menuList: (provided) => ({ ...provided, maxHeight: "16rem", padding: "0" }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "0.875rem",
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "var(--light-1)"
      : state.isFocused
        ? "var(--light-3)"
        : "var(--white-1)",
    color: state.isSelected ? "var(--primary-1)" : "var(--black-2)",
    fontWeight: state.isSelected ? 500 : 400,
  }),
};
