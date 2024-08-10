import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import RestaurantsPage from "../components/restaurants/pages/restaurantsPage";
import RestaurantLicensesPage from "../components/restaurants/pages/restaurantLicensesPage";

const Restaurants = () => {
  return (
    <Routes>
      <Route path="/" element={<RestaurantsPage />} />
      <Route path="/licenses/:id" element={<RestaurantLicensesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Restaurants;
