import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "migrosYemekGetRestaurants",
  actionType: "MigrosYemek/GetRestaurants",
  request: async () => (await api.get("MigrosYemek/GetRestaurants")).data.data,
});

export const migrosYemekGetRestaurants = thunk;
export const { reset: resetMigrosYemekGetRestaurants } = actions;
export default reducer;
