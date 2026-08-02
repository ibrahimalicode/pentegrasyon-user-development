const toastOptions = {
  position: "top-center",
  style: {
    border: "1px solid var(--border-1)",
    borderRadius: "0.75rem",
    padding: "12px 16px",
    color: "var(--black-1)",
    background: "var(--white-1)",
    boxShadow:
      "0 4px 6px -1px rgb(15 23 42 / 0.07), 0 2px 4px -2px rgb(15 23 42 / 0.06)",
    maxWidth: "50rem",
  },
  success: {
    duration: 5000,
    iconTheme: { primary: "var(--green-1)", secondary: "#ffffff" },
  },
  error: {
    duration: 5000,
    iconTheme: { primary: "var(--red-1)", secondary: "#ffffff" },
  },
};

export default toastOptions;
