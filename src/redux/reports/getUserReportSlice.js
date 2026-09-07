import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

// Period report for the signed-in user, restaurants[] included (backend
// #235/#236). Either periodType (0 Monthly, 1 MidMonth) or an explicit
// startDate/endDate range (max 366 days) — never both.
const { thunk, reducer, actions } = createApiSlice({
  name: "getUserReport",
  actionType: "RestaurantReports/GetUserReport",
  request: async (data) =>
    (
      await api.get("RestaurantReports/GetUserReport", {
        params: data,
      })
    ).data.data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getUserReport = thunk;
export const { reset: resetGetUserReport } = actions;
export default reducer;
