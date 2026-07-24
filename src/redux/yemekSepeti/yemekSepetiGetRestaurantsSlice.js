import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "yemekSepetiGetRestaurants",
  actionType: "YemekSepeti/GetRestaurants",
  request: async () => (await api.get("YemekSepeti/GetRestaurants")).data.data,
});

export const yemekSepetiGetRestaurants = thunk;
export const { reset: resetYemekSepetiGetRestaurants } = actions;
export default reducer;
