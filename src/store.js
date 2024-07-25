import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "./redux/auth/loginSlice";
import verifyCodeSlice from "./redux/auth/verifyCodeSlice";

const authSlice = combineReducers({
  login: loginSlice,
  code: verifyCodeSlice,
});

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
