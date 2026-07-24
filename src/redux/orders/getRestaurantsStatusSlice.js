import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getRestaurantsStatus",
  actionType: "Tickets/GetRestaurants",
  dataKey: "restaurantStatuses",
  request: async () => (await api.get("Tickets/GetRestaurants")).data.data,
  mapError: (err) => ({
    message: err.message,
    status: err?.response?.status,
  }),
});

export const getRestaurantsStatus = thunk;
export const { reset: resetGetRestaurantsStatus } = actions;
export default reducer;
