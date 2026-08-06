import CustomToggle from "../../common/customToggle";
import { cn } from "../../../lib/utils";

// Backend sends `isAvailabilityStale` on every marketplace GetRestaurants
// record (PR #172): true means the last successful availability sync is
// older than 30 minutes, so the on/off value we hold is NOT trustworthy.
// A frozen cache previously let the panel show a restaurant as closed for
// a whole day while it was open, so a stale toggle must read as "unknown"
// rather than as a confident state — and must not be operable, since
// UpdateRestaurantStatus would fail against the unresponsive mapping.

export const STALE_NOTE = "Durum güncellenemiyor";
export const PENDING_ACTIVATION_NOTE = "Aktivasyon bekleniyor";

// A record that has never produced a usable status is still waiting for the
// marketplace to activate the mapping; anything else is a sync that broke.
export const staleNote = (restaurant) =>
  restaurant?.restaurantStatus == null
    ? PENDING_ACTIVATION_NOTE
    : STALE_NOTE;

const RestaurantStatusToggle = ({
  label,
  checked,
  onChange,
  disabled,
  stale,
  note,
  className,
  className1,
  className2,
}) => (
  <div className="flex flex-col">
    <CustomToggle
      label={label}
      // A stale toggle keeps its last-known position but loses the
      // confident brand colour, so it doesn't assert a live state.
      className={cn(
        "scale-75 order-2",
        stale && "peer-checked:bg-[--gr-5]",
        className
      )}
      className1={cn("flex-col max-sm:items-start", className1)}
      className2={cn("order-1 ml-[0]", className2)}
      onChange={onChange}
      checked={checked}
      disabled={disabled || stale}
    />
    {stale && (
      <span
        title="Pazaryeri durum bilgisi 30 dakikadır güncellenmedi"
        className="mt-0.5 text-[0.65rem] leading-tight text-[--yellow-1] whitespace-nowrap"
      >
        {note}
      </span>
    )}
  </div>
);

export default RestaurantStatusToggle;
