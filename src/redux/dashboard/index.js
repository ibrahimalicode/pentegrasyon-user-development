import { combineReducers } from "@reduxjs/toolkit";
import getRestaurantStatisticsSlice from "./restaurant/getRestaurantStatisticsSlice";
import getLicenseStatisticsSlice from "./license/getLicenseStatisticsSlice";

const dashboardSlice = combineReducers({
  restaurant: getRestaurantStatisticsSlice,
  license: getLicenseStatisticsSlice,
});

export default dashboardSlice;
