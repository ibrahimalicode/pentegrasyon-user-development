import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getAvailableCouriers",
  actionType: "Couriers/GetAvailableCouriers",
  dataKey: "couriers",
  request: async (data) =>
    (
      await api.get("Couriers/GetAvailableCouriers", {
        params: { ...data },
      })
    ).data.data,
});

export const getAvailableCouriers = thunk;
export const { reset: resetGetAvailableCouriers } = actions;
export default reducer;
