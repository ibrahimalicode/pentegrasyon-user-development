import { cn } from "../../lib/utils";

// Empty state for list pages. The icon sits in a soft disc so it reads as an
// illustration rather than a stray oversized glyph.
//
// `text` is the legacy single-line API and still works; it is treated as the
// description when no explicit `description` is given. `action` takes a ready
// -made node (usually a <Button>) so the empty state always offers a way out.
const NoTableData = ({
  Icon,
  text,
  title,
  description,
  action,
  className,
}) => {
  const body = description ?? text;

  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center text-center gap-3 py-16 px-6",
        className
      )}
    >
      {Icon && (
        <span className="flex items-center justify-center size-10 rounded-full bg-[--light-3] text-[--gr-1]">
          <Icon className="size-5" strokeWidth={1.5} />
        </span>
      )}

      {title && (
        <p className="text-lg font-semibold text-[--black-1]">{title}</p>
      )}

      {body && <p className="max-w-sm text-sm text-[--gr-1]">{body}</p>}

      {action}
    </div>
  );
};

export default NoTableData;
