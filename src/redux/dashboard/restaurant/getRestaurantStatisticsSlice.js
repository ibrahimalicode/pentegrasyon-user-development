import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getRestaurantStatistics",
  actionType: "Statistics/GetRestaurantStatistics",
  request: async () =>
    (await api.get("Statistics/GetRestaurantStatistics")).data.data,
  mapError: (err) => {
    console.log(err);
    if (err?.response?.data) {
      return err.response.data;
    }
    return { message_TR: err.message };
  },
});

export const getRestaurantStatistics = thunk;
export const { reset: resetGetRestaurantStatistics } = actions;
export default reducer;
