import { combineReducers } from "@reduxjs/toolkit";
import getEmailParametersSlice from "./email/getEmailParametersSlice";
import updateEmailParametersSlice from "./email/updateEmailParametersSlice";
import sendTestEmailSlice from "./email/sendTestEmailSlice";
import getSMSParametersSlice from "./sms/getSMSParametersSlice";
import updateSMSParametersSlice from "./sms/updateSMSParametersSlice";
import getExchangeParametersSlice from "./currency/getExchangeParametersSlice";
import updateExchangeParametersSlice from "./currency/updateExchangeParametersSlice";
import getKDVParametersSlice from "./KDVParameters/getKDVParametersSlice";
import updateKDVParametersSlice from "./KDVParameters/updateKDVParametersSlice";

const generalVariablesSlice = combineReducers({
  getEmailParams: getEmailParametersSlice,
  updateEmailParams: updateEmailParametersSlice,
  sendEmail: sendTestEmailSlice,
  getSMSParams: getSMSParametersSlice,
  updateSMSParams: updateSMSParametersSlice,
  getExchangeParameters: getExchangeParametersSlice,
  updateExchangeParams: updateExchangeParametersSlice,
  getKDVParams: getKDVParametersSlice,
  updateKDVParams: updateKDVParametersSlice,
});

export default generalVariablesSlice;
