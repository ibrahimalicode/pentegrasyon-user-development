import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getirYemekGetRestaurants",
  actionType: "GetirYemek/GetRestaurants",
  request: async () => (await api.get("GetirYemek/GetRestaurants")).data.data,
});

export const getirYemekGetRestaurants = thunk;
export const { reset: resetGetirYemekGetRestaurants } = actions;
export default reducer;
