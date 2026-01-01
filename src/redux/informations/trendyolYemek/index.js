import { combineReducers } from "@reduxjs/toolkit";
import addIntegrationInformationSlice from "./addIntegrationInformationSlice";
import getIntegrationInformationByLicenseIdSlice from "./getIntegrationInformationByLicenseIdSlice";
import updateIntegrationInformationSlice from "./updateIntegrationInformationSlice";

const trendyolYemekSlice = combineReducers({
  addIntegrationInfo: addIntegrationInformationSlice,
  getIntegrationInfo: getIntegrationInformationByLicenseIdSlice,
  updateIntegrationInfo: updateIntegrationInformationSlice,
});

export default trendyolYemekSlice;
