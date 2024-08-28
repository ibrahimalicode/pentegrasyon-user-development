import { Route, Routes } from "react-router-dom";
import UsersPage from "../components/users/pages/usersPage";
import NotFound from "./404";
import UserRestaurants from "../components/users/pages/userRestaurantsPage";
import UserLicensesPage from "../components/users/pages/userLicensesPage";
import RestaurantLicensesPage from "../components/restaurants/pages/restaurantLicensesPage";
import ExtendLicensePage from "../components/licenses/pages/extendLicensePage";

const Users = () => {
  const licenseExtend = "licenses/:id/extend-license";
  const restaurantLicense = "restaurants/licenses/:id";
  const restaurantExtend = "restaurants/licenses/:id/extend-license";
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="restaurants/:id" element={<UserRestaurants />} />
      <Route path="licenses/:id" element={<UserLicensesPage />} />
      <Route path={licenseExtend} element={<ExtendLicensePage />} />
      <Route path={restaurantLicense} element={<RestaurantLicensesPage />} />
      <Route path={restaurantExtend} element={<ExtendLicensePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Users;
