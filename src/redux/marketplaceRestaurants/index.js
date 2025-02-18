import { combineReducers } from "@reduxjs/toolkit";

// Slices
import deleteRestaurantByMarketplaceRestaurantIdSlice from "./deleteRestaurantByMarketplaceRestaurantIdSlice";

const marketplaceRestaurantsSlice = combineReducers({
  deleteRestaurant: deleteRestaurantByMarketplaceRestaurantIdSlice,
});

export default marketplaceRestaurantsSlice;
