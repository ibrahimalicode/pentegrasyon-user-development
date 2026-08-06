import { cn } from "../../lib/utils";

// The one button. Every action in the product should resolve to a variant +
// size here rather than a hand-typed class string.
//
// Interaction vocabulary (single set, no exceptions):
//   hover    fill change only — no border-colour swap, no accent tint
//   active   depressed by 1px, plus a fill/brightness step
//   focus    handled globally by the :focus-visible rule in index.css
//   disabled opacity only — geometry NEVER changes, so rows can't twitch
//
// Legacy call sites pass `text` / `icon` / `className`; both still work and
// className wins through twMerge.

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap " +
  "transition-colors active:translate-y-px disabled:opacity-45 disabled:cursor-not-allowed";

const SIZE = {
  sm: "h-7 px-2 text-xs [&_svg]:size-3.5",
  md: "h-8 px-3 text-sm [&_svg]:size-4",
  lg: "h-9 px-3 text-sm [&_svg]:size-4",
};

const VARIANT = {
  primary:
    "bg-[--primary-1] text-[--white-1] font-semibold hover:bg-[--primary-2] active:brightness-95",
  secondary:
    "bg-[--white-1] border border-[--border-1] text-[--black-2] hover:bg-[--light-3] hover:border-[--gr-2] active:bg-[--light-4]",
  ghost:
    "bg-transparent text-[--black-2] hover:bg-[--light-3] active:bg-[--light-4]",
  danger:
    "bg-[--red-1] text-[--white-1] font-semibold hover:brightness-110 active:brightness-95",
};

// 14px ring spinner. Sized in em so it follows the button's own text size.
const Spinner = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    className="absolute size-3.5 animate-spin"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.25"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

function Button({
  text,
  children,
  icon,
  iconLeft,
  iconRight,
  onClick,
  className,
  disabled,
  type,
  variant = "secondary",
  size = "md",
  loading = false,
  as: Component = "button",
  ...rest
}) {
  const label = children ?? text;
  const isButton = Component === "button";

  return (
    <Component
      className={cn(
        BASE,
        SIZE[size] || SIZE.md,
        VARIANT[variant] || VARIANT.secondary,
        loading && "relative",
        className
      )}
      onClick={onClick}
      disabled={isButton ? disabled || loading : undefined}
      aria-disabled={!isButton && (disabled || loading) ? true : undefined}
      aria-busy={loading || undefined}
      type={isButton ? type : undefined}
      {...rest}
    >
      {loading && <Spinner />}
      {/* The label keeps its box while loading so the button never resizes. */}
      <span
        className={cn(
          "inline-flex items-center gap-1.5",
          loading && "opacity-0"
        )}
      >
        {iconLeft}
        {label}
        {icon}
        {iconRight}
      </span>
    </Component>
  );
}

export default Button;
