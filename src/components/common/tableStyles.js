// Canonical data-table chrome. Every list table composes from these so
// headers, row rhythm, dividers and hover behaviour stay identical across
// features. Compose with cn() when a table needs a local tweak.

export const TABLE_SCROLL = "w-full overflow-x-auto";

export const TABLE_CARD =
  "rounded-xl border border-[--border-1] bg-[--white-1] overflow-hidden";

export const TABLE = "w-full text-sm border-collapse";

export const THEAD_ROW = "bg-[--light-3]";

export const TH =
  "px-4 py-3 text-left text-[0.7rem] font-semibold uppercase tracking-wider text-[--gr-1] whitespace-nowrap";

// Rows are separated by dividers rather than zebra striping — striping
// fights the hover state and makes status colours harder to read.
export const TR =
  "border-t border-[--border-1] transition-colors hover:bg-[--light-3]";

export const TD = "px-4 py-3 align-middle text-[--black-2]";

// Inline value chips (region, courier…) used to be full bordered boxes,
// which made every row look like a form. This is the quieter treatment.
export const CELL_CHIP =
  "inline-flex items-center max-w-[14rem] truncate rounded-md bg-[--light-3] px-2 py-1 text-xs text-[--black-3]";
