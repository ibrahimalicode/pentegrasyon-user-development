import { cn } from "../../lib/utils";

// Empty state for list pages: a layered icon disc, a real title with a
// supporting line under it, and an optional action so the user can fix the
// emptiness right where they see it instead of hunting for the toolbar
// button. `text` alone still works for states that need no headline.
const NoTableData = ({ Icon, title, text, action, className }) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center items-center text-center py-16 sm:py-20 px-6",
        className
      )}
    >
      {Icon && (
        <span className="flex items-center justify-center size-20 rounded-full bg-[--light-3] text-[--primary-1] ring-8 ring-[--light-3]/50">
          <Icon className="size-9" strokeWidth={1.2} />
        </span>
      )}

      {title && (
        <h3 className="mt-6 text-base font-semibold text-[--black-1]">
          {title}
        </h3>
      )}

      {text && (
        <p className={cn("max-w-sm text-sm text-[--gr-1]", title ? "mt-1.5" : "mt-6")}>
          {text}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default NoTableData;
