import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LicenseI } from "../../../assets/icon";
import ActionButton from "../../common/actionButton";

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
    <ActionButton
      element={<LicenseI className="w-5" strokeWidth="1.8" />}
      element2="Lisanslar"
      onClick={handleClick}
    />
  );
};

export default UserRestaurantLicenses;
