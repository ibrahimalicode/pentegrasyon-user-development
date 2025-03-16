import { combineReducers } from "@reduxjs/toolkit";
import getSMSParametersSlice from "./sms/getSMSParametersSlice";
import getExchangeParametersSlice from "./currency/getExchangeParametersSlice";
import getKDVParametersSlice from "./KDVParameters/getKDVParametersSlice";
import advertsSlice from "./adverts";

const generalVariablesSlice = combineReducers({
  getSMSParams: getSMSParametersSlice,
  getExchangeParameters: getExchangeParametersSlice,
  getKDVParams: getKDVParametersSlice,
  adverts: advertsSlice,
});

export default generalVariablesSlice;
