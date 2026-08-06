// Canonical data-table chrome. Every list table composes from these so
// headers, row rhythm, dividers and hover behaviour stay identical across
// features. Compose with cn() when a table needs a local tweak.

export const TABLE_SCROLL = "w-full overflow-x-auto";

export const TABLE_CARD =
  "rounded-xl border border-[--border-1] bg-[--white-1] overflow-hidden";

export const TABLE = "w-full text-sm border-collapse";

// The head band sits on the recessed plane so the data rows read as the
// brightest surface on screen.
export const THEAD_ROW = "bg-[--gr-4] border-b border-[--border-1]";

export const TH =
  "px-3 h-[30px] text-left text-2xs font-semibold uppercase tracking-[0.04em] text-[--gr-1] whitespace-nowrap";

// Rows are separated by dividers rather than zebra striping — striping
// fights the hover state and makes status colours harder to read.
export const TR =
  "border-t border-[--border-1] transition-colors hover:bg-[--light-3]";

export const TD = "px-3 py-[7px] align-middle text-[--black-2]";

// Inline value chips (region, courier…) used to be full bordered boxes,
// which made every row look like a form. This is the quieter treatment.
// Capped at 20px so nothing in a cell exceeds the 28px in-cell ceiling.
export const CELL_CHIP =
  "inline-flex items-center h-5 max-w-[14rem] truncate rounded-sm bg-[--light-3] px-2 text-xs text-[--black-3]";
