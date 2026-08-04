import { cn } from "../../lib/utils";

// Empty state for list pages. The icon sits in a soft disc so it reads as an
// illustration rather than a stray oversized glyph.
const NoTableData = ({ Icon, text, className }) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center items-center text-center py-16 sm:py-24 px-6",
        className
      )}
    >
      {Icon && (
        <span className="flex items-center justify-center size-24 rounded-full bg-[--light-3] text-[--gr-1]">
          <Icon className="size-[3rem]" strokeWidth={1.2} />
        </span>
      )}
      <p className="mt-5 max-w-sm text-sm text-[--gr-1]">{text}</p>
    </div>
  );
};

export default NoTableData;
