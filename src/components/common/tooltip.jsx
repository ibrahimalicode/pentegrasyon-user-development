import { cn } from "../../lib/utils";

// Caret that points out of a tooltip bubble. `color` is a CSS variable name so
// the caret can be matched to whatever border/fill the bubble uses.
function ToolTip({ className, color = "--border-1" }) {
  return (
    <div
      className={cn(
        "absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0",
        "border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8",
        className
      )}
      style={{
        borderTop: `8px solid var(${color})`,
      }}
    ></div>
  );
}

export default ToolTip;
