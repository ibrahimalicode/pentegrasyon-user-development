import React from "react";
import { cn } from "../../lib/utils";

// The old version built its classes by interpolating variable names
// (`bg-[${colors.main[0]}]`), which Tailwind can't see at build time, so the
// bar rendered unstyled. Colours are literal classes now: --primary-1 fills a
// reached step, --light-4 is the untouched track.
function StepBar({ step, steps, className }) {
  const stepsArray = Array.from({ length: steps }, (_, index) => index + 1);

  return (
    <div className={cn("w-full flex items-center py-5", className)}>
      {stepsArray.map((num, index) => {
        const reached = step >= num;
        const connectorFilled = step >= num + 1;

        return (
          <React.Fragment key={index}>
            <div className="w-full max-w-10 h-10 shrink-0 rounded-full border border-solid border-[--border-1] bg-[--white-1] relative overflow-hidden">
              <div
                className="absolute left-0 top-0 w-full h-full bg-[--primary-1] transition-transform ease-in"
                style={{
                  transform: reached ? "translateX(0)" : "translateX(-100%)",
                  transitionDelay: reached ? "200ms" : "0ms",
                }}
              ></div>
              <div
                className={cn(
                  "w-full h-full flex justify-center items-center rounded-full relative z-20 text-sm font-semibold transition-colors",
                  reached ? "text-white" : "text-[--gr-1]"
                )}
              >
                {num}
              </div>
            </div>

            <div
              key={num}
              className={cn(
                "w-full h-1.5 relative overflow-hidden bg-[--light-4]",
                num === steps && "hidden"
              )}
            >
              <div
                className="absolute w-full h-full bg-[--primary-1] transition-transform duration-200 ease-in"
                style={{
                  transform: connectorFilled
                    ? "translateX(0)"
                    : "translateX(-100%)",
                  transitionDelay: connectorFilled ? "0ms" : "200ms",
                }}
              ></div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default StepBar;
