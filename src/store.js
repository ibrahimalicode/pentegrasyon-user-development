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

const authSlice = combineReducers({
  login: loginSlice,
  logout: logoutSlice,
  register: registerSlice,
  forgotPassword: forgotPasswordSlice,
  changePassword: changePasswordSlice,
  verifyUser: userVerificationSlice,
  verifyCode: verifyCodeSlice,
});

const usersSlice = combineReducers({
  add: addUserSlice,
  delete: deleteUserSlice,
  getUsers: getUsersSlice,
});

const restaurantsSlice = combineReducers({
  getRestaurants: getRestaurantsSlice,
  getUserRestaurants: getUserRestaurantsSlice,
});

const licensesSlice = combineReducers({
  getUserLicenses: getUserLicensesSlice,
});

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    restaurants: restaurantsSlice,
    licenses: licensesSlice,
  },
});

export default store;
