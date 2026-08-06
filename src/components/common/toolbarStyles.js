// Shared toolbar vocabulary. Everything sitting in a page toolbar (stat
// readouts, filter/action buttons, inline selects) uses the same 32px "md"
// control height, so a toolbar row reads as one family instead of a pile of
// differently-sized boxes. Focus is left to the global :focus-visible rule
// in index.css — no per-component ring.

export const TOOLBAR_ROW = "flex flex-wrap items-center gap-2";

export const TOOLBAR_STAT =
  "flex flex-col justify-center h-8 px-3 rounded-md border border-[--border-1] bg-[--white-1] text-center whitespace-nowrap";

export const TOOLBAR_STAT_LABEL =
  "text-2xs font-semibold uppercase text-[--gr-1] leading-none";

export const TOOLBAR_STAT_VALUE =
  "text-sm font-semibold tabular-nums text-[--black-1] leading-none mt-1";

// Secondary action: fill-only hover. No border or text colour change — the
// accent is scarce and does not belong on a toolbar button.
export const TOOLBAR_BTN =
  "inline-flex items-center justify-center gap-2 h-8 px-3 rounded-md border border-[--border-1] bg-[--white-1] text-sm font-medium text-[--black-2] hover:bg-[--light-3] active:bg-[--light-4] active:translate-y-px transition-colors whitespace-nowrap disabled:opacity-45 disabled:cursor-not-allowed";

// Primary call-to-action in a toolbar (e.g. "Lisans Ekle"). Hover lightens in
// both themes because --primary-2 is the on-surface accent.
export const TOOLBAR_BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 h-8 px-3 rounded-md bg-[--primary-1] text-sm font-semibold text-[--white-1] hover:bg-[--primary-2] active:brightness-95 active:translate-y-px transition-colors whitespace-nowrap disabled:opacity-45 disabled:cursor-not-allowed";

// Bordered wrapper for an inline label + borderless select pair.
export const TOOLBAR_SELECT_GROUP =
  "flex items-center gap-2 h-8 pl-3 pr-1 rounded-md border border-[--border-1] bg-[--white-1] whitespace-nowrap";

// react-select overrides that strip the control chrome inside the group.
export const TOOLBAR_SELECT_CONTROL = {
  border: "none",
  boxShadow: "none",
  backgroundColor: "transparent",
  minHeight: "2rem",
  height: "2rem",
  paddingLeft: 0,
};
