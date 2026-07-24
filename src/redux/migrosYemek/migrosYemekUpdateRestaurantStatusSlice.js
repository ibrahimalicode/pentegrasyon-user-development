import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "migrosYemekUpdateRestaurantStatus",
  actionType: "MigrosYemek/UpdateRestaurantStatus",
  // PUT sends the payload both as body and as query params (backend binds
  // from query) — preserved from the original slice.
  request: async (data) => {
    console.log(data);
    const res = await api.put(
      "MigrosYemek/UpdateRestaurantStatus",
      { ...data },
      { params: { ...data } }
    );
    return res.data;
  },
});

export const migrosYemekUpdateRestaurantStatus = thunk;
export const { reset: resetMigrosYemekUpdateRestaurantStatus } = actions;
export default reducer;
