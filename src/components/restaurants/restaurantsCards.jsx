import { useLocation, useNavigate } from "react-router-dom";

import ChangeRestaurantStatus from "./actions/restaurantIsActive";
import { RestourantI, ArrowIR } from "../../assets/icon";

// 05342166400 -> 0534 216 64 00
const formatPhone = (phone = "") => {
  const digits = String(phone).replace(/\D/g, "");
  return digits.length === 11
    ? `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(
        7,
        9
      )} ${digits.slice(9)}`
    : phone;
};

const PhoneIcon = () => (
  <svg
    className="size-4 shrink-0 text-[--gr-3]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const PinIcon = () => (
  <svg
    className="size-4 shrink-0 text-[--gr-3] mt-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Restaurants are few and attribute-rich, so cards read better than a
// wide table with mostly empty columns.
const RestaurantsCards = ({ inData, Actions, totalItems, onSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};

  const handleClick = (restaurant) => {
    const path = location.pathname.includes("users")
      ? "/users/restaurants/licenses/"
      : "/restaurants/licenses/";

    navigate(`${path}${restaurant.id}`, { state: { user, restaurant } });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {inData.map((data, index) => (
        <article
          key={data.id}
          onClick={() => handleClick(data)}
          className="group relative flex flex-col cursor-pointer rounded-xl border border-solid border-[--border-1] bg-[--white-1] shadow-card transition-colors hover:border-[--primary-1]"
        >
          <div className="flex items-start gap-3 p-4 pb-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[--light-1] text-[--primary-1] [&>svg]:size-5">
              <RestourantI />
            </span>

            <div className="min-w-0 flex-1">
              <h3
                title={data.name}
                className="truncate font-semibold text-[--black-1]"
              >
                {data.name}
              </h3>
              <div
                className="mt-1.5 w-max"
                onClick={(e) => e.stopPropagation()}
              >
                <ChangeRestaurantStatus
                  restaurant={data}
                  onSuccess={onSuccess}
                />
              </div>
            </div>

            {/* Anchor for the actions dropdown inside the card */}
            <div
              className="relative shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Actions
                index={index}
                restaurant={data}
                onSuccess={onSuccess}
                totalItems={totalItems}
                menuClassName="right-0 top-8"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-4 pb-4 text-sm">
            <a
              href={`tel:${data.phoneNumber}`}
              onClick={(e) => e.stopPropagation()}
              className="flex w-max items-center gap-2 text-[--black-3] hover:text-[--primary-1] transition-colors"
            >
              <PhoneIcon />
              <span className="tabular-nums">
                {formatPhone(data.phoneNumber)}
              </span>
            </a>

            <div className="flex items-start gap-2">
              <PinIcon />
              <div className="min-w-0">
                <p className="text-[--black-3]">
                  {[data.city, data.district].filter(Boolean).join(" · ")}
                </p>
                <p className="text-xs text-[--gr-1] line-clamp-2">
                  {[data.neighbourhood, data.address].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-solid border-[--border-1] px-4 py-3 text-sm font-medium text-[--primary-1]">
            Lisansları görüntüle
            <ArrowIR className="size-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </article>
      ))}
    </div>
  );
};

export default RestaurantsCards;

// Card-shaped loading state — the page used to fall back to a table
// skeleton, which no longer matches what actually renders.
export const RestaurantsCardsSkeleton = ({ count = 3 }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-[13.5rem] rounded-xl border border-solid border-[--border-1] bg-[--light-3] fade"
      />
    ))}
  </div>
);
