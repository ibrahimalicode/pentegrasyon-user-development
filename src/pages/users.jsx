import { Route, Routes } from "react-router-dom";
import UsersPage from "../components/users/pages/usersPage";
import NotFound from "./404";
import UserRestaurants from "../components/users/pages/userRestaurantsPage";
import UserLicensesPage from "../components/users/pages/userLicensesPage";
import RestaurantLicensesPage from "../components/restaurants/pages/restaurantLicensesPage";

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="restaurants/:id" element={<UserRestaurants />} />
      <Route path="licenses/:id" element={<UserLicensesPage />} />
      <Route
        path="restaurants/licenses/:id"
        element={<RestaurantLicensesPage />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Users;
