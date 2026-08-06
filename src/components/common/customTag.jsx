import CloseI from "../../assets/icon/close";
import { cn } from "../../lib/utils";

const CustomTag = ({ onClick, data }) => {
  return (
    <div
      key={data.id}
      className={cn(
        "w-44 flex items-center justify-between gap-2 py-1.5 pl-3 pr-1.5 rounded-full",
        "border border-solid border-[--border-1] bg-[--light-3]",
        "text-xs text-[--black-3] whitespace-nowrap"
      )}
    >
      <p className="truncate">
        {data.label.slice(0, 16)}
        {data.label.length > 16 && "..."}
      </p>
      <button
        type="button"
        aria-label="Kaldır"
        className={cn(
          "shrink-0 p-1 rounded-full text-[--gr-1] transition-colors",
          "hover:bg-[--light-4] hover:text-[--red-1]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--primary-1)_30%,transparent)]"
        )}
        onClick={onClick}
      >
        <CloseI className="size-[1rem]" />
      </button>
    </div>
  );
};

export default CustomTag;
