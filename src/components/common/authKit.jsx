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
    className={`w-full flex justify-center items-center h-11 mt-6 text-base font-semibold rounded-md bg-[--primary-1] text-[--white-1] transition-colors hover:bg-[--primary-2] active:brightness-95 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
  >
    {loading ? <LoadingI className="h-6 text-[--white-1]" /> : children}
  </button>
);

export const AuthFooter = ({ question, linkText, to }) => (
  <p className="mt-6 text-center text-sm text-[--gr-1]">
    {question}{" "}
    <Link to={to} className="font-medium text-[--link-1] hover:underline">
      {linkText}
    </Link>
  </p>
);

export const AuthDivider = () => (
  <div className="my-6 h-px w-full bg-[--border-1]" />
);
