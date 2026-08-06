import { cn } from "../../../lib/utils";

// Shared chrome for the restaurant-status panel. The four marketplace
// sections were byte-identical apart from a brand colour and the field the
// name lives on, so the layout lives here once — including the fix for the
// name colliding with the "Restoran Durumu" label, which happened because a
// min-w-56 name sat next to a w-full controls block with nothing to yield.

// A <div>, deliberately not a <section>: index.css sets
// `section { min-height: 100dvh }` globally, which stretched every card to a
// full viewport and pushed its siblings out of view.
export const StatusCard = ({ brandVar, title, logo, notice, children }) => (
  <div className="overflow-hidden rounded-lg border border-solid border-[--border-1] bg-[--white-1]">
    <header
      className="flex items-center gap-2 px-3 py-2 text-[--white-1]"
      style={{ backgroundColor: `var(${brandVar})` }}
    >
      {logo && <img alt="" src={logo} className="size-5 rounded-full" />}
      <h3 className="text-sm font-semibold">{title}</h3>
    </header>

    {notice}

    <div className="divide-y divide-[--border-1]">{children}</div>
  </div>
);

// remainingDays === null hides the licence line entirely.
export const StatusRow = ({ name, remainingDays, controls, action }) => {
  const expired = Number.isFinite(remainingDays) && remainingDays <= 0;
  const expiring = Number.isFinite(remainingDays) && remainingDays < 15;

  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      {/* min-w-0 + truncate is what stops a long restaurant name from running
          into the controls; the full name stays available on hover. */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-[--black-1]" title={name}>
          {name}
        </p>

        {Number.isFinite(remainingDays) && (
          <p
            className={cn(
              "mt-0.5 text-xs",
              expiring ? "text-[--red-1]" : "text-[--gr-1]"
            )}
          >
            {expired
              ? "Lisans süresi doldu"
              : `Lisansın bitimine ${remainingDays} gün kaldı`}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-4">{controls}</div>
      <div className="shrink-0">{action}</div>
    </div>
  );
};
