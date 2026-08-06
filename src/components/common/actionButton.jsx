import { cn } from "../../lib/utils";

// Row inside a dropdown/action menu. Styled as a menu item (compact, rounded,
// hover-filled) rather than a bordered full-width bar.
const ActionButton = ({ className, element, element2, onClick }) => {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm",
        // No hover text colour: call sites tint destructive items red via
        // `className` and that tint must survive the hover state.
        "text-[--black-2] cursor-pointer transition-colors",
        "hover:bg-[--light-3]",
        "focus-visible:outline-none focus-visible:bg-[--light-3] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color-mix(in_srgb,var(--primary-1)_30%,transparent)]",
        className
      )}
      onClick={onClick}
    >
      {element} {element2}
    </button>
  );
};

export default ActionButton;
