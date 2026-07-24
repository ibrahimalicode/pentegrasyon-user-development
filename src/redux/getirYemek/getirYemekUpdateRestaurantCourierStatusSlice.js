import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getirYemekUpdateRestaurantCourierStatus",
  actionType: "GetirYemek/UpdateRestaurantCourierStatus",
  // PUT sends the payload both as body and as query params (backend binds
  // from query) — preserved from the original slice.
  request: async (data) => {
    const res = await api.put(
      "GetirYemek/UpdateRestaurantCourierStatus",
      { ...data },
      { params: { ...data } }
    );
    return res.data;
  },
});

export const getirYemekUpdateRestaurantCourierStatus = thunk;
export const { reset: resetGetirYemekUpdateRestaurantCourierStatus } = actions;
export default reducer;
