import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./redux/auth/loginSlice";
import verifyCodeSlice from "./redux/auth/verifyCodeSlice";
import getUsersSlice from "./redux/users/getUsersSlice";
import logoutSlice from "./redux/auth/logoutSlice";
import registerSlice from "./redux/auth/registerSlice";
import addUserSlice from "./redux/users/addUserSlice";
import forgotPasswordSlice from "./redux/auth/forgotPasswordSlice";
import changePasswordSlice from "./redux/auth/changePasswordSlice";
import userVerificationSlice from "./redux/auth/userVerificationSlice";
import getRestaurantsSlice from "./redux/restaurants/getRestaurantsSlice";
import deleteUserSlice from "./redux/users/deleteUserSlice";
import getUserRestaurantsSlice from "./redux/restaurants/getUserRestaurantsSlice";
import getUserLicensesSlice from "./redux/licenses/getUserLicensesSlice";
import getCitiesSlice from "./redux/data/getCitiesSlice";
import getDistrictsSlice from "./redux/data/getDistrictsSlice";
import getNeighsSlice from "./redux/data/getNeighsSlice";
import getUserByIdSlice from "./redux/users/getUserByIdSlice";
import updateUserInvoiceSlice from "./redux/users/updateUserInvoiceSlice";
import updateUserPasswordSlice from "./redux/users/updateUserPasswordSlice";
import adduserInvoiceSlice from "./redux/users/adduserInvoiceSlice";
import updateUserIsActiveSlice from "./redux/users/updateUserIsActiveSlice";
import updateUserIsVerifiedSlice from "./redux/users/updateUserIsVerifiedSlice";
import getRestaurantLicensesSlice from "./redux/licenses/getRestaurantLicensesSlice";
import deleteRestaurantSlice from "./redux/restaurants/deleteRestaurantSlice";
import updateRestaurantSlice from "./redux/restaurants/updateRestaurantSlice";
import getLocationSlice from "./redux/data/getLocationSlice";
import addRestaurantSlice from "./redux/restaurants/addRestaurantSlice";
import getLicensesSlice from "./redux/licenses/getLicensesSlice";
import addLicenseSlice from "./redux/licenses/addLicenseSlice";
import getCurrencySlice from "./redux/data/getCurrencySlice";
import getLicensePackagesSlice from "./redux/licensePackages/getLicensePackagesSlice";
import addLicensePackageSlice from "./redux/licensePackages/addLicensePackageSlice";
import deleteLicensePackageSlice from "./redux/licensePackages/deleteLicensePackageSlice";
import updateLicenseDateSlice from "./redux/licenses/updateLicenseDateSlice";
import updateLicenseIsActiveSlice from "./redux/licenses/updateLicenseIsActiveSlice";
import deleteLicenseSlice from "./redux/licenses/deleteLicenseSlice";
import getAdminSlice from "./redux/admin/getAdminSlice";
import getUserSlice from "./redux/user/getUserSlice";
import updateAdminDataSlice from "./redux/admin/updateAdminDataSlice";
import updateUserDataByIdSlice from "./redux/users/updateUserDataByIdSlice";
import updateUserDataSlice from "./redux/user/updateUserDataSlice";

const authSlice = combineReducers({
  login: loginSlice,
  logout: logoutSlice,
  register: registerSlice,
  forgotPassword: forgotPasswordSlice,
  changePassword: changePasswordSlice,
  verifyUser: userVerificationSlice,
  verifyCode: verifyCodeSlice,
});

const adminSlice = combineReducers({
  getAdmin: getAdminSlice,
  updateAdminData: updateAdminDataSlice,
});

const userSlice = combineReducers({
  getUser: getUserSlice,
  updateUserData: updateUserDataSlice,
});

const usersSlice = combineReducers({
  getUsers: getUsersSlice,
  getUser: getUserByIdSlice,
  addUser: addUserSlice,
  delete: deleteUserSlice,
  updateUser: updateUserDataByIdSlice,
  addInvoice: adduserInvoiceSlice,
  updateInvoice: updateUserInvoiceSlice,
  updatePassword: updateUserPasswordSlice,
  updateIsActive: updateUserIsActiveSlice,
  updateIsVerified: updateUserIsVerifiedSlice,
});

const restaurantsSlice = combineReducers({
  getRestaurants: getRestaurantsSlice,
  getUserRestaurants: getUserRestaurantsSlice,
  deleteRestaurant: deleteRestaurantSlice,
  updateRestaurant: updateRestaurantSlice,
  addRestaurant: addRestaurantSlice,
});

const licensesSlice = combineReducers({
  getLicenses: getLicensesSlice,
  getUserLicenses: getUserLicensesSlice,
  getRestaurantLicenses: getRestaurantLicensesSlice,
  addLicense: addLicenseSlice,
  updateLicenseDate: updateLicenseDateSlice,
  updateLicenseIsActive: updateLicenseIsActiveSlice,
  deleteLicense: deleteLicenseSlice,
});

const licensePackagesSlice = combineReducers({
  getLicensePackages: getLicensePackagesSlice,
  addLicensePackage: addLicensePackageSlice,
  deleteLicensePackage: deleteLicensePackageSlice,
});

const dataSlice = combineReducers({
  getCities: getCitiesSlice,
  getDistricts: getDistrictsSlice,
  getNeighs: getNeighsSlice,
  getLocation: getLocationSlice,
  getCurrency: getCurrencySlice,
});

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
    user: userSlice,
    users: usersSlice,
    restaurants: restaurantsSlice,
    licenses: licensesSlice,
    licensePackages: licensePackagesSlice,
    data: dataSlice,
  },
});

export default store;
