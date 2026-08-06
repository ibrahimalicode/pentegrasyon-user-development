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

// Licence health at a glance. The ring depletes as expiry approaches — full
// green is healthy, a shrinking red arc is urgent — so the number doesn't
// have to be read to notice a problem.
const RING_WINDOW_DAYS = 90;

export const licenseTone = (days) =>
  days < 30 ? "--red-1" : days < 60 ? "--yellow-1" : "--green-1";

export const LicenseRing = ({ days }) => {
  const radius = 7;
  const circumference = 2 * Math.PI * radius;
  const filled = Math.max(0, Math.min(days / RING_WINDOW_DAYS, 1));

  return (
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="size-4 shrink-0 -rotate-90"
    >
      <circle
        cx="9"
        cy="9"
        r={radius}
        fill="none"
        strokeWidth="3"
        className="stroke-[--light-4]"
      />
      <circle
        cx="9"
        cy="9"
        r={radius}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          stroke: `var(${licenseTone(days)})`,
          strokeDasharray: circumference,
          strokeDashoffset: circumference * (1 - filled),
        }}
      />
    </svg>
  );
};

// remainingDays === undefined hides the licence line entirely.
export const StatusRow = ({ name, remainingDays, controls, action }) => {
  const hasLicense = Number.isFinite(remainingDays);
  const expired = hasLicense && remainingDays <= 0;

  return (
    // Stacks below sm so the name gets the full width on a phone instead of
    // being squeezed into a column beside the controls.
    <div className="flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3">
      {/* min-w-0 + truncate is what stops a long restaurant name from running
          into the controls; the full name stays available on hover. */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-[--black-1]" title={name}>
          {name}
        </p>

        {hasLicense && (
          <p
            className={cn(
              "mt-0.5 flex items-center gap-1.5 text-xs",
              remainingDays < 30 ? "text-[--red-1]" : "text-[--gr-1]"
            )}
          >
            <LicenseRing days={remainingDays} />
            {expired
              ? "Lisans süresi doldu"
              : `Lisansın bitimine ${remainingDays} gün kaldı`}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center gap-4">{controls}</div>
        <div className="shrink-0">{action}</div>
      </div>
    </div>
  );
};
