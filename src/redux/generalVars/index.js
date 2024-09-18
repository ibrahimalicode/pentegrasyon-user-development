import { combineReducers } from "@reduxjs/toolkit";
import getSMSParametersSlice from "./sms/getSMSParametersSlice";
import getExchangeParametersSlice from "./currency/getExchangeParametersSlice";
import getKDVParametersSlice from "./KDVParameters/getKDVParametersSlice";

const generalVariablesSlice = combineReducers({
  getSMSParams: getSMSParametersSlice,
  getExchangeParameters: getExchangeParametersSlice,
  getKDVParams: getKDVParametersSlice,
});

export default generalVariablesSlice;
