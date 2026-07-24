import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getRestaurantSalesStatistics",
  actionType: "Statistics/getRestaurantSalesStatistics",
  request: async () =>
    (await api.get("Statistics/getRestaurantSalesStatistics")).data.data,
  mapError: (err) => {
    console.log(err);
    if (err?.response?.data) {
      return err.response.data;
    }
    return { message_TR: err.message };
  },
});

export const getRestaurantSalesStatistics = thunk;
export const { reset: resetGetRestaurantSalesStatistics } = actions;
export default reducer;
