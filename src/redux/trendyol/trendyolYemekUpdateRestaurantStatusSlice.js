import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "trendyolYemekUpdateRestaurantStatus",
  actionType: "Trendyol/UpdateRestaurantStatus",
  // PUT sends the payload both as body and as query params (backend binds
  // from query) — preserved from the original slice.
  request: async (data) => {
    console.log(data);
    const res = await api.put(
      "Trendyol/UpdateRestaurantStatus",
      { ...data },
      { params: { ...data } }
    );
    return res.data;
  },
  // Preserved from the original slice: the response body is only surfaced
  // as the error payload when it has a nested `data` field
  // (err.response.data.data — note the extra `.data`); anything else falls
  // back to the interceptor-derived message.
  mapError: (err) =>
    err?.response?.data?.data ? err.response.data : { message_TR: err.message },
});

export const trendyolYemekUpdateRestaurantStatus = thunk;
export const { reset: resetTrendyolYemekUpdateRestaurantStatus } = actions;
export default reducer;
