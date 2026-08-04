import { cn } from "../../lib/utils";

// Track is 44x24 with a 20px knob and 2px inset, so the checked knob travels
// exactly translate-x-5 and lands flush with the opposite edge.
const CustomToggle = ({
  id,
  label,
  checked,
  onChange,
  className1,
  className,
  className2,
  disabled,
}) => {
  return (
    <label
      className={cn(
        "inline-flex items-center",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className1
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only peer"
      />
      <div
        className={cn(
          "relative shrink-0 w-11 h-6 rounded-full bg-[--gr-5] transition-colors duration-300",
          "after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-card after:transition-transform after:duration-300 after:ease-in-out",
          "peer-checked:bg-[--primary-1] peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-5",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-[--primary-1]/30 peer-focus-visible:ring-offset-1",
          className
        )}
      ></div>

      <span className={cn("ml-4 text-sm text-[--black-2]", className2)}>
        {label}
      </span>
    </label>
  );
};

export default CustomToggle;
