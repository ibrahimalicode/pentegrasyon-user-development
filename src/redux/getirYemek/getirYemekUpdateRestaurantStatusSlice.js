import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getirYemekUpdateRestaurantStatus",
  actionType: "GetirYemek/UpdateRestaurantStatus",
  // PUT sends the payload both as body and as query params (backend binds
  // from query) — preserved from the original slice.
  request: async (data) => {
    const res = await api.put(
      "GetirYemek/UpdateRestaurantStatus",
      { ...data },
      { params: { ...data } }
    );
    return res.data;
  },
});

export const getirYemekUpdateRestaurantStatus = thunk;
export const { reset: resetGetirYemekUpdateRestaurantStatus } = actions;
export default reducer;
