import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getLicensesSlice from "./getLicensesSlice";
import getUserLicensesSlice from "./getUserLicensesSlice";
import getRestaurantLicensesSlice from "./getRestaurantLicensesSlice";
import addLicenseSlice from "./addLicenseSlice";
import updateLicenseDateSlice from "./updateLicenseDateSlice";
import updateLicenseIsActiveSlice from "./updateLicenseIsActiveSlice";
import deleteLicenseSlice from "./deleteLicenseSlice";
import extendByOnlinePaySlice from "./extendLicense/extendByOnlinePaySlice";
import addByOnlinePaySlice from "./addLicense/addByOnlinePaySlice";
import addByBankPaySlice from "./addLicense/addByBankPaySlice";
import extendByBankPaySlice from "./extendLicense/extendByBankPaySlice";

const licensesSlice = combineReducers({
  getLicenses: getLicensesSlice,
  getUserLicenses: getUserLicensesSlice,
  getRestaurantLicenses: getRestaurantLicensesSlice,
  addLicense: addLicenseSlice,
  updateLicenseDate: updateLicenseDateSlice,
  updateLicenseIsActive: updateLicenseIsActiveSlice,
  deleteLicense: deleteLicenseSlice,
  addByPay: addByOnlinePaySlice,
  extendByPay: extendByOnlinePaySlice,
  addByBank: addByBankPaySlice,
  extendByBank: extendByBankPaySlice,
});

export default licensesSlice;
