import { combineReducers } from "@reduxjs/toolkit";
import getirYemekSlice from "./getirYemek";

const integrationInformationsSlice = combineReducers({
  getirYemek: getirYemekSlice,
});

export default integrationInformationsSlice;
