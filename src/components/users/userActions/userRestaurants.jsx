import { useNavigate } from "react-router-dom";
import { RestourantI } from "../../../assets/icon";

const UserRestaurants = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/restaurants/${user.id}`);
  };
  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left border-b border-solid border-[--border-1] cursor-pointer"
      onClick={handleClick}
    >
      <RestourantI className="w-5" /> Restaurants
    </button>
  );
};

export default UserRestaurants;
