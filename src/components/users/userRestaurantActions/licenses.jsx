import { useNavigate } from "react-router-dom";
import { LicenseI } from "../../../assets/icon";

const UserRestaurantLicenses = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate("/users/licenses/${id}")
    console.log("lisanslar");
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
