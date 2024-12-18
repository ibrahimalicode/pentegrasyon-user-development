import { combineReducers, configureStore } from "@reduxjs/toolkit";

// INDEX
import authSlice from "./redux/auth";
import dataSlice from "./redux/data";
import generalVariablesSlice from "./redux/generalVars";
import licensePackagesSlice from "./redux/licensePackages";
import licensesSlice from "./redux/licenses";
import restaurantsSlice from "./redux/restaurants";
import userSlice from "./redux/user";
import getContextSlice from "./redux/payTR/getContextSlice";
import cartSlice from "./redux/cart/cartSlice";
import ordersSlice from "./redux/orders";
import getirYemekSlice from "./redux/getirYemek";
import dashboardSlice from "./redux/dashboard";
import couriersSlice from "./redux/couriers";
import integrationInformationsSlice from "./redux/informations";
import yemekSepetiSlice from "./redux/yemekSepeti";
import paymentsSlice from "./redux/payments";

const appReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  restaurants: restaurantsSlice,
  licenses: licensesSlice,
  licensePackages: licensePackagesSlice,
  data: dataSlice,
  generalVars: generalVariablesSlice,
  getContext: getContextSlice,
  cart: cartSlice,
  orders: ordersSlice,
  getirYemek: getirYemekSlice,
  yemekSepeti: yemekSepetiSlice,
  dashboard: dashboardSlice,
  couriers: couriersSlice,
  payments: paymentsSlice,
  integrationInfos: integrationInformationsSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
