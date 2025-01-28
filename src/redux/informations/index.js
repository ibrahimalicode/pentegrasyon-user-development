import { combineReducers } from "@reduxjs/toolkit";
import getirYemekSlice from "./getirYemek";
import yemekSepetiSlice from "./yemekSepeti";
import migrosYemekSlice from "./migrosYemek";

const integrationInformationsSlice = combineReducers({
  getirYemek: getirYemekSlice,
  yemekSepeti: yemekSepetiSlice,
  migrosYemek: migrosYemekSlice,
});

export default integrationInformationsSlice;
