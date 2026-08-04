import { useLocation, useNavigate } from "react-router-dom";
import ChangeRestaurantStatus from "./actions/restaurantIsActive";
import {
  TABLE,
  TABLE_CARD,
  TABLE_SCROLL,
  TD,
  TH,
  THEAD_ROW,
  TR,
} from "../common/tableStyles";
import { cn } from "../../lib/utils";

const RestaurantsTable = ({ inData, Actions, totalItems, onSuccess }) => {
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
    <main className={TABLE_SCROLL}>
      <div className={cn(TABLE_CARD, "min-h-[30rem] min-w-[60rem]")}>
        <table className={TABLE}>
          <thead>
            <tr className={THEAD_ROW}>
              <th className={TH}>Restoran</th>
              <th className={TH}>Telefon</th>
              <th className={TH}>Il</th>
              <th className={TH}>Durum</th>
              <th className={cn(TH, "text-center")}>İşlem</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, index) => (
              <tr key={data.id} className={TR}>
                <td
                  onClick={() => handleClick(data)}
                  className={cn(TD, "cursor-pointer")}
                >
                  {data.name}
                </td>
                <td
                  onClick={() => handleClick(data)}
                  className={cn(TD, "cursor-pointer")}
                >
                  {data.phoneNumber}
                </td>
                <td
                  onClick={() => handleClick(data)}
                  className={cn(TD, "cursor-pointer")}
                >
                  {data.city}
                </td>
                <td className={TD}>
                  <ChangeRestaurantStatus
                    restaurant={data}
                    onSuccess={onSuccess}
                  />
                </td>
                <td className={cn(TD, "w-14 relative")}>
                  <Actions
                    index={index}
                    restaurant={data}
                    onSuccess={onSuccess}
                    totalItems={totalItems}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default RestaurantsTable;
