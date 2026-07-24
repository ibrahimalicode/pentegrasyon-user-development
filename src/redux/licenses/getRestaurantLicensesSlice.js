import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getRestaurantLicenses",
  actionType: "Licenses/GetLicensesByRestaurantId",
  dataKey: "restaurantLicenses",
  request: async (data) =>
    (
      await api.get("Licenses/GetLicensesByRestaurantId", {
        params: data,
      })
    ).data,
});

export const getRestaurantLicenses = thunk;
export const {
  resetState: resetGetRestaurantLicensesState,
  reset: resetGetRestaurantLicenses,
} = actions;
export default reducer;
