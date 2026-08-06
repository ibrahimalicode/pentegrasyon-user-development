import toast from "react-hot-toast";
import { CloseI, InfoI } from "../../assets/icon";
import { cn } from "../../lib/utils";

export default function CustomToast({ color, message, t }) {
  // Status semantics are load-bearing: the left rail colour is how the user
  // tells an error from a success. Only the container chrome is restyled.
  const classNames =
    color === "red"
      ? {
          elmnt1: "border-[color-mix(in_srgb,var(--red-1)_40%,transparent)]",
          elmnt2: "bg-[--status-red] text-[--red-1]",
        }
      : color === "green"
      ? {
          elmnt1: "border-[color-mix(in_srgb,var(--green-1)_40%,transparent)]",
          elmnt2: "bg-[--status-green] text-[--green-1]",
        }
      : {
          elmnt1: "border-[color-mix(in_srgb,var(--brown-1)_40%,transparent)]",
          elmnt2: "bg-[--status-red] text-[--red-1]",
        };

  return (
    <div
      className={cn(
        "max-w-md w-full flex overflow-hidden pointer-events-auto",
        "rounded-xl border border-solid bg-[--white-1] shadow-modal",
        "transition-all duration-200",
        classNames.elmnt1,
        t.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
    >
      <div
        className={cn(
          "flex justify-center items-center px-3 mr-3 shrink-0",
          classNames.elmnt2
        )}
      >
        <InfoI />
      </div>
      <div className="flex-1 w-0 py-3.5">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5"></div>
          <div className="flex-1">
            <p
              className="text-sm font-semibold text-[--black-1]"
              dangerouslySetInnerHTML={{ __html: message.title }}
            >
              {/* {message.title} */}
            </p>
            <p
              className="mt-1 text-sm text-[--gr-1]"
              dangerouslySetInnerHTML={{ __html: message.content }}
            >
              {/* {message.content} */}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-[--border-1]">
        <button
          onClick={() => toast.dismiss(t?.id)}
          aria-label="Kapat"
          className={cn(
            "h-full px-4 flex items-center justify-center",
            "text-sm font-medium text-[--gr-1] transition-colors",
            "hover:bg-[--light-3] hover:text-[--black-2]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color-mix(in_srgb,var(--primary-1)_30%,transparent)]"
          )}
        >
          <CloseI />
        </button>
      </div>
    </div>
  );
}
