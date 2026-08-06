import { Link } from "react-router-dom";
import LoadingI from "../../assets/anim/loading";

// Shared auth-page primitives. Every auth screen (login, register, forgot
// password, set new password) MUST build its header/submit/footer from
// these so typography and spacing cannot drift between pages.

export const AuthHeader = ({ title, subtitle }) => (
  <header className="mb-8">
    <h1 className="text-2xl font-bold tracking-tight text-[--black-1]">
      {title}
    </h1>
    {subtitle && <p className="mt-1.5 text-sm text-[--gr-1]">{subtitle}</p>}
  </header>
);

export const AuthSubmit = ({ children, loading, disabled, className = "" }) => (
  <button
    type="submit"
    disabled={disabled || loading}
    className={`w-full flex justify-center items-center h-11 mt-6 text-base font-semibold rounded-lg bg-[--primary-1] text-white transition-colors hover:bg-[#4338ca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary-1] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
  >
    {loading ? <LoadingI className="h-6 text-white" /> : children}
  </button>
);

export const AuthFooter = ({ question, linkText, to }) => (
  <p className="mt-6 text-center text-sm text-[--gr-1]">
    {question}{" "}
    <Link to={to} className="font-medium text-[--primary-1] hover:underline">
      {linkText}
    </Link>
  </p>
);

export const AuthDivider = () => (
  <div className="my-6 h-px w-full bg-[--border-1]" />
);
