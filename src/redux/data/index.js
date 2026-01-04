import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getCitiesSlice from "./getCitiesSlice";
import getCurrencySlice from "./getCurrencySlice";
import getDistrictsSlice from "./getDistrictsSlice";
import getLocationSlice from "./getLocationSlice";
import getNeighsSlice from "./getNeighsSlice";
import getUserAddressSlice from "./getUserAddressSlice";

const dataSlice = combineReducers({
  getCities: getCitiesSlice,
  getDistricts: getDistrictsSlice,
  getNeighs: getNeighsSlice,
  getLocation: getLocationSlice,
  getCurrency: getCurrencySlice,
  getUserAddress: getUserAddressSlice,
});

export default dataSlice;
