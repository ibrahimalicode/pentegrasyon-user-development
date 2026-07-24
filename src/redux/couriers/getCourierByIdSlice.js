import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getCourierById",
  actionType: "Couriers/GetCourierById",
  dataKey: "ticket",
  request: async (data) =>
    (
      await api.get("Couriers/GetCourierById", {
        params: data,
      })
    ).data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getCourierById = thunk;
export const { reset: resetGetCourierById } = actions;
export default reducer;
