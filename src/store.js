import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./redux/auth/loginSlice";
import verifyCodeSlice from "./redux/auth/verifyCodeSlice";
import getUsersSlice from "./redux/users/getUsersSlice";
import logoutSlice from "./redux/auth/logoutSlice";

const authSlice = combineReducers({
  login: loginSlice,
  logout: logoutSlice,
  code: verifyCodeSlice,
});

const usersSlice = combineReducers({
  getUsers: getUsersSlice,
});

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
  },
});

export default store;
