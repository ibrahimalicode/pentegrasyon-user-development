import { combineReducers } from "@reduxjs/toolkit";
import getirYemekSlice from "./getirYemek";
import yemekSepetiSlice from "./yemekSepeti";

const integrationInformationsSlice = combineReducers({
  getirYemek: getirYemekSlice,
  yemekSepeti: yemekSepetiSlice,
});

export default integrationInformationsSlice;
