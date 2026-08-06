// Canonical form-control styling. Every field primitive (input, select,
// phone, textarea) composes from these so controls line up on a single
// baseline: same height, padding, radius, border and focus treatment.
// Override per call site with the component's className props — they run
// through cn()/twMerge, so later classes win cleanly.

export const FIELD_WRAPPER = "flex flex-col w-full relative mt-3 sm:mt-5";

// Label role: 11px caps. Form labels keep --black-3 (they sit next to the
// value they name, unlike a TH which is pure chrome).
export const FIELD_LABEL =
  "block text-2xs font-semibold uppercase tracking-[0.04em] text-[--black-3] text-left mb-1.5";

// h-9 (36px) is the "lg" control tier — form fields inside forms and modals.
// Auth screens keep their own 44px submit; everything else lands here.
// dark:bg-[--white-2] keeps controls readable against a --white-1 card.
// Focus is a border swap plus a 2px accent ring derived from --primary-2, so
// it tracks the theme instead of a hardcoded indigo.
export const FIELD_BASE =
  "h-9 w-full px-3 rounded-md border border-solid border-[--border-1] bg-[--white-1] dark:bg-[--white-2] text-sm text-[--black-2] placeholder:text-[--gr-3] dark:placeholder:text-[--gr-1] outline-none transition-[border-color,box-shadow] focus:border-[--primary-2] focus:shadow-[0_0_0_2px_color-mix(in_srgb,var(--primary-2)_25%,transparent)] disabled:opacity-60 disabled:bg-[--light-3] disabled:placeholder:text-[--gr-1] disabled:cursor-not-allowed";

// --gr-3 is unreadable on a --light-3 fill, so the disabled state above pins
// the placeholder to --gr-1. Same rule applies to the react-select mirror.
const FOCUS_RING = "0 0 0 2px color-mix(in srgb, var(--primary-2) 25%, transparent)";

// react-select needs the same look expressed as style objects.
export const SELECT_STYLES = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "2.25rem",
    height: "2.25rem",
    cursor: "pointer",
    paddingLeft: "0.375rem",
    borderRadius: "0.375rem",
    backgroundColor: "var(--white-1)",
    borderColor: state.isFocused ? "var(--primary-2)" : "var(--border-1)",
    boxShadow: state.isFocused ? FOCUS_RING : "none",
    "&:hover": { borderColor: "var(--gr-2)" },
    transition: "border-color 140ms, box-shadow 140ms",
  }),
  valueContainer: (provided) => ({ ...provided, padding: "0 0.25rem" }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--gr-3)",
    fontSize: "0.8125rem",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--black-2)",
    fontSize: "0.8125rem",
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
    backgroundColor: "var(--white-1)",
    border: "1px solid var(--border-1)",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow:
      "0 4px 12px -2px rgb(9 13 20 / 0.12), 0 2px 4px -2px rgb(9 13 20 / 0.08)",
    zIndex: 9999,
  }),
  menuList: (provided) => ({ ...provided, maxHeight: "16rem", padding: "0" }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "0.8125rem",
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "var(--light-1)"
      : state.isFocused
        ? "var(--light-3)"
        : "var(--white-1)",
    color: state.isSelected ? "var(--primary-2)" : "var(--black-2)",
    fontWeight: state.isSelected ? 500 : 400,
  }),
};
