//COMP
import CloseI from "../../assets/icon/close";

// Shared chrome for form popups: a proper header with the title and a close
// button, a body that scrolls on its own, and a pinned footer for actions —
// so a tall form never pushes its buttons out of reach. Replaces the old
// pattern of a centered <h1> plus a floating circular close button.
//
// `overlay` renders above everything inside the shell (e.g. the map picker);
// give it absolute inset-0 and a z-index.
const PopupShell = ({ title, onClose, footer, overlay, children }) => (
  <div className="relative flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-xl border border-solid border-[--border-1] bg-[--white-1] text-[--black-2]">
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-solid border-[--border-1] px-5 py-4">
      <h2 className="text-base font-semibold text-[--black-1]">{title}</h2>
      <button
        type="button"
        aria-label="Kapat"
        onClick={onClose}
        className="flex size-8 items-center justify-center rounded-lg text-[--gr-1] transition-colors hover:bg-[--light-3] hover:text-[--black-1]"
      >
        <CloseI className="size-5" />
      </button>
    </header>

    <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">{children}</div>

    {footer && (
      <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-solid border-[--border-1] px-5 py-3">
        {footer}
      </footer>
    )}

    {overlay}
  </div>
);

export default PopupShell;
