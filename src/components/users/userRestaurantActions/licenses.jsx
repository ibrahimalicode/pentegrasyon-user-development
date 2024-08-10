import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LicenseI } from "../../../assets/icon";

const UserRestaurantLicenses = ({ restaurant }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const handleClick = () => {
    const path = location.pathname.includes("users")
      ? "/users/restaurants/licenses/"
      : "/restaurants/licenses/";

    navigate(`${path}${restaurant.id}`, {
      state: { userId: params.id },
    });
  };

  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left border-b border-solid border-[--border-1] cursor-pointer"
      onClick={handleClick}
    >
      <LicenseI className="w-5" strokeWidth="1.8" /> Lisanslar
    </button>
  );
};

export default UserRestaurantLicenses;
