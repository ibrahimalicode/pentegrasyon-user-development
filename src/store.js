import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./redux/auth/loginSlice";
import verifyCodeSlice from "./redux/auth/verifyCodeSlice";
import getUsersSlice from "./redux/users/getUsersSlice";
import logoutSlice from "./redux/auth/logoutSlice";
import registerSlice from "./redux/auth/registerSlice";
import addUserSlice from "./redux/users/addUserSlice";
import forgotPasswordSlice from "./redux/auth/forgotPasswordSlice";
import changePasswordSlice from "./redux/auth/changePasswordSlice";

const authSlice = combineReducers({
  login: loginSlice,
  logout: logoutSlice,
  register: registerSlice,
  forgotPassword: forgotPasswordSlice,
  changePassword: changePasswordSlice,
  verify: verifyCodeSlice,
});

const usersSlice = combineReducers({
  add: addUserSlice,
  getUsers: getUsersSlice,
});

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
  },
});

export default store;
