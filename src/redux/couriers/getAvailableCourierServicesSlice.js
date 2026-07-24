import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getAvailableCourierServices",
  actionType: "Couriers/GetAvailableCourierServices",
  dataKey: "services",
  request: async (data) =>
    (
      await api.get("Couriers/GetAvailableCourierServices", {
        params: { ...data },
      })
    ).data.data,
});

export const getAvailableCourierServices = thunk;
export const { reset: resetGetAvailableCourierServices } = actions;
export default reducer;
