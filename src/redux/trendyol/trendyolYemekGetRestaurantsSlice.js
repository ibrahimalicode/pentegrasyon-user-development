import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "trendyolYemekGetRestaurants",
  actionType: "Trendyol/GetRestaurants",
  request: async () => (await api.get("Trendyol/GetRestaurants")).data.data,
});

export const trendyolYemekGetRestaurants = thunk;
export const { reset: resetTrendyolYemekGetRestaurants } = actions;
export default reducer;
