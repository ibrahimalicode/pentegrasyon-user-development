/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        // Elevation scale for cards / dropdowns / modals (UI refresh 2026-08)
        card: "0 1px 2px 0 rgb(15 23 42 / 0.05), 0 1px 3px 0 rgb(15 23 42 / 0.06)",
        dropdown:
          "0 4px 6px -1px rgb(15 23 42 / 0.07), 0 2px 4px -2px rgb(15 23 42 / 0.06)",
        modal:
          "0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.08)",
      },
    },
    // NOTE: an earlier remap set normal=350/light=250, rendering the whole
    // app near-hairline. Standard Tailwind weights are restored on purpose.
  },
  plugins: [],
};
