// Shared toolbar vocabulary. Everything sitting in a page toolbar (stat
// readouts, filter/action buttons, inline selects) uses the same h-11
// control height as form fields and buttons, so a toolbar row reads as one
// family instead of a pile of differently-sized boxes.

export const TOOLBAR_ROW = "flex flex-wrap items-center gap-2";

export const TOOLBAR_STAT =
  "flex flex-col justify-center h-11 px-4 rounded-lg border border-[--border-1] bg-[--white-1] text-center whitespace-nowrap";

export const TOOLBAR_STAT_LABEL =
  "text-[0.65rem] font-medium uppercase tracking-wide text-[--gr-1] leading-none";

export const TOOLBAR_STAT_VALUE =
  "text-sm font-semibold text-[--black-1] leading-none mt-1";

export const TOOLBAR_BTN =
  "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-[--border-1] bg-[--white-1] text-sm font-medium text-[--black-2] hover:bg-[--light-3] hover:border-[--primary-1] hover:text-[--primary-1] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary-1]/30 disabled:opacity-60 disabled:cursor-not-allowed";

// Primary call-to-action in a toolbar (e.g. "Lisans Ekle").
export const TOOLBAR_BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[--primary-1] text-sm font-semibold text-white hover:bg-[#4338ca] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary-1]/40";

// Bordered wrapper for an inline label + borderless select pair.
export const TOOLBAR_SELECT_GROUP =
  "flex items-center gap-2 h-11 pl-4 pr-1 rounded-lg border border-[--border-1] bg-[--white-1] whitespace-nowrap";

// react-select overrides that strip the control chrome inside the group.
export const TOOLBAR_SELECT_CONTROL = {
  border: "none",
  boxShadow: "none",
  backgroundColor: "transparent",
  minHeight: "2.25rem",
  height: "2.25rem",
  paddingLeft: 0,
  // react-select's control wraps by default, which pushed the chevron onto a
  // second line once the control was squeezed.
  flexWrap: "nowrap",
  // Without a floor the control collapsed to ~43px while "15 dk sonra" needs
  // ~77px, so every value rendered as "15 …". The floor has to cover the
  // chevron too: ~78px of text + 8px value padding + 36px indicator, plus a
  // couple of px of slack for wider glyphs ("55" renders wider than "15").
  minWidth: "8rem",
};
