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

// Licence health at a glance. The bar shows how much of a one-year licence
// is left, so it drains steadily toward expiry — a 64-day licence reads as
// nearly spent rather than nearly full — while the colour carries the
// urgency tier independently.
const LICENSE_WINDOW_DAYS = 365;

export const licenseTone = (days) =>
  days < 30 ? "--red-1" : days < 60 ? "--yellow-1" : "--green-1";

// End-to-end progress bar under the row.
export const LicenseBar = ({ days }) => {
  const filled = Math.max(0, Math.min(days / LICENSE_WINDOW_DAYS, 1));

  return (
    <div
      aria-hidden="true"
      className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[--light-4]"
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${filled * 100}%`,
          backgroundColor: `var(${licenseTone(days)})`,
        }}
      />
    </div>
  );
};

// remainingDays === undefined hides the licence line and bar entirely.
export const StatusRow = ({ name, remainingDays, controls, action }) => {
  const hasLicense = Number.isFinite(remainingDays);
  const expired = hasLicense && remainingDays <= 0;

  return (
    <div className="px-3 py-2.5">
      {/* Stacks below sm so the name gets the full width on a phone instead
          of being squeezed into a column beside the controls. */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        {/* min-w-0 + truncate is what stops a long restaurant name from
            running into the controls; the full name stays on hover. */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-[--black-1]" title={name}>
            {name}
          </p>

          {hasLicense && (
            <p
              className={cn(
                "mt-0.5 text-xs",
                remainingDays < 30 ? "text-[--red-1]" : "text-[--gr-1]"
              )}
            >
              {expired
                ? "Lisans süresi doldu"
                : `Lisansın ${remainingDays} gün kaldı`}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="flex items-center gap-4">{controls}</div>
          <div className="shrink-0">{action}</div>
        </div>
      </div>

      {hasLicense && <LicenseBar days={remainingDays} />}
    </div>
  );
};
