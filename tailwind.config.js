/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Geist",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          '"Geist Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },

      // Retuned scale: the app was rendering at desktop-marketing sizes
      // (14/16/18/24/30) for an operational tool. These are the sizes dense
      // enterprise products actually use. theme.extend MERGES, so no key is
      // deleted — text-4xl and friends survive, they are just repriced.
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "0.875rem", letterSpacing: "0.04em" }], // 11/14
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.005em" }], // 12/16
        sm: ["0.8125rem", { lineHeight: "1.125rem", letterSpacing: "0" }], // 13/18
        base: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "-0.006em" }], // 14/20
        lg: ["0.9375rem", { lineHeight: "1.375rem", letterSpacing: "-0.008em" }], // 15/22
        xl: ["1.0625rem", { lineHeight: "1.5rem", letterSpacing: "-0.012em" }], // 17/24
        "2xl": ["1.25rem", { lineHeight: "1.625rem", letterSpacing: "-0.016em" }], // 20/26
        "3xl": ["1.5rem", { lineHeight: "1.875rem", letterSpacing: "-0.019em" }], // 24/30
        "4xl": ["1.75rem", { lineHeight: "2.125rem", letterSpacing: "-0.022em" }], // 28/34
      },

      // bold -> 600 converts all 132 font-bold sites at once and closes the
      // two-typographic-systems split. Unlike the reverted remap this only
      // compresses the TOP of the scale; normal stays a true 400. 700 is still
      // reachable via font-extrabold (wordmark + print receipts).
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "600",
        extrabold: "700",
      },

      // Three values plus pill. Keys are REMAPPED, never deleted: removing
      // xl/2xl/3xl would silently square 25 existing sites with no build error.
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "4px",
        md: "6px",
        lg: "6px",
        xl: "10px",
        "2xl": "10px",
        "3xl": "10px",
        full: "9999px",
      },

      // Hairline-structural: anything with a fixed place in the layout gets a
      // border and NO shadow. Only dismissible floating things get a shadow.
      // `card` is deliberately a 1px ring, so the existing shadow-card call
      // sites degrade to a hairline with zero file edits.
      boxShadow: {
        card: "0 0 0 1px rgb(11 18 32 / 0.04)",
        dropdown:
          "0 4px 12px -2px rgb(9 13 20 / 0.12), 0 2px 4px -2px rgb(9 13 20 / 0.08)",
        modal:
          "0 16px 40px -8px rgb(9 13 20 / 0.24), 0 4px 10px -4px rgb(9 13 20 / 0.14)",
        dock: "-8px 0 24px -8px rgb(9 13 20 / 0.1)",
      },
    },
  },
  plugins: [],
};
