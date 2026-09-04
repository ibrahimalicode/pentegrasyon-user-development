import { combineReducers } from "@reduxjs/toolkit";

//SLICES
import getRestaurantStatisticsSlice from "./restaurant/getRestaurantStatisticsSlice";
import getLicenseStatisticsSlice from "./license/getLicenseStatisticsSlice";
import getRestaurantSalesStatisticsSlice from "./restaurant/getRestaurantSalesStatisticsSlice";
import getOrderStatisticsSlice from "./statistics/getOrderStatisticsSlice";

const dashboardSlice = combineReducers({
  license: getLicenseStatisticsSlice,
  restaurant: getRestaurantStatisticsSlice,
  getOrderStatistics: getOrderStatisticsSlice,
  restaurantSales: getRestaurantSalesStatisticsSlice,
});

export default dashboardSlice;
