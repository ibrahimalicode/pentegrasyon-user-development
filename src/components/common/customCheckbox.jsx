import CheckI from "../../assets/icon/check";
import { cn } from "../../lib/utils";

// Tailwind can't see interpolated class names, so sizes are looked up as
// literals here (the old `size-${size}` produced no class at all).
const SIZES = {
  4: "size-4",
  5: "size-5",
  6: "size-6",
};

const CustomCheckbox = ({
  id,
  label,
  checked,
  onChange,
  className,
  className2,
  size = "5",
  Icon = <CheckI className="h-3.5 text-[--white-1]" strokeWidth="4" />,
}) => {
  return (
    <label
      className={cn(
        "max-w-max flex items-center gap-2.5 cursor-pointer group",
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <span
        className={cn(
          "flex shrink-0 justify-center items-center rounded-sm border transition-colors",
          SIZES[size] || SIZES[5],
          checked
            ? "bg-[--primary-1] border-[--primary-1]"
            : "bg-[--white-1] border-[--border-1] group-hover:border-[--gr-2]",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-[--primary-2]"
        )}
      >
        {checked && Icon}
      </span>
      {label && (
        <span className={cn("text-sm text-[--black-3]", className2)}>
          {label}
        </span>
      )}
    </label>
  );
};

export default CustomCheckbox;
