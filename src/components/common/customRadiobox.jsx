import { cn } from "../../lib/utils";

// Sizes must be literal strings for Tailwind to emit them.
const SIZES = {
  4: "size-4",
  5: "size-5",
  6: "size-6",
};

const CustomRadiobox = ({
  id,
  label,
  checked,
  onClick,
  className,
  className2,
  size = "5",
  name,
}) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        "max-w-max flex items-center gap-2.5 cursor-pointer group",
        className
      )}
    >
      <input
        id={id}
        type="radio"
        checked={checked}
        onClick={onClick}
        onChange={() => {}}
        className="sr-only peer"
        name={name}
      />
      <span
        className={cn(
          "flex shrink-0 justify-center items-center rounded-full border-2 bg-[--white-1] transition-colors",
          SIZES[size] || SIZES[5],
          checked
            ? "border-[--primary-1]"
            : "border-[--border-1] group-hover:border-[--gr-2]",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-[--primary-2]"
        )}
      >
        {checked && (
          <span className="size-2 rounded-full bg-[--primary-1]"></span>
        )}
      </span>
      {label && (
        <span className={cn("text-sm text-[--black-3]", className2)}>
          {label}
        </span>
      )}
    </label>
  );
};

export default CustomRadiobox;
