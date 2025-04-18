import { combineReducers } from "@reduxjs/toolkit";
import getirYemekSlice from "./getirYemek";
import yemekSepetiSlice from "./yemekSepeti";
import migrosYemekSlice from "./migrosYemek";
import paketNetSlice from "./paketNet";

const integrationInformationsSlice = combineReducers({
  getirYemek: getirYemekSlice,
  yemekSepeti: yemekSepetiSlice,
  migrosYemek: migrosYemekSlice,
  paketNet: paketNetSlice,
});

export default integrationInformationsSlice;
