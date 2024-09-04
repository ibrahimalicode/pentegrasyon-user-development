import { configureStore } from "@reduxjs/toolkit";

// INDEX
import authSlice from "./redux/auth";
import dataSlice from "./redux/data";
import generalVariablesSlice from "./redux/generalVars";
import licensePackagesSlice from "./redux/licensePackages";
import licensesSlice from "./redux/licenses";
import restaurantsSlice from "./redux/restaurants";
import userSlice from "./redux/user";
import usersSlice from "./redux/users";
import getContextSlice from "./redux/payTR/getContextSlice";
import cartSlice from "./redux/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    users: usersSlice,
    restaurants: restaurantsSlice,
    licenses: licensesSlice,
    licensePackages: licensePackagesSlice,
    data: dataSlice,
    generalVars: generalVariablesSlice,
    getContext: getContextSlice,
    cart: cartSlice,
  },
});

export default store;
