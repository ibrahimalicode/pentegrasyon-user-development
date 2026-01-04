import { combineReducers } from "@reduxjs/toolkit";
import getirYemekSlice from "./getirYemek";
import yemekSepetiSlice from "./yemekSepeti";
import migrosYemekSlice from "./migrosYemek";
import paketNetSlice from "./paketNet";
import trendyolYemekSlice from "./trendyolYemek";

const integrationInformationsSlice = combineReducers({
  getirYemek: getirYemekSlice,
  yemekSepeti: yemekSepetiSlice,
  migrosYemek: migrosYemekSlice,
  paketNet: paketNetSlice,
  trendyolYemek: trendyolYemekSlice,
});

export default integrationInformationsSlice;
