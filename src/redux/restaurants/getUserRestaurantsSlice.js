import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "GetUserRestaurants",
  actionType: "Restaurants/GetRestaurantsByUserId",
  dataKey: "restaurants",
  request: async ({
    userId,
    pageNumber = null,
    pageSize = null,
    searchKey = null,
    active = null,
    city = null,
    district = null,
    neighbourhood = null,
  }) =>
    (
      await api.get("Restaurants/GetRestaurantsByUserId", {
        params: {
          userId,
          pageNumber,
          pageSize,
          searchKey,
          active,
          city,
          district,
          neighbourhood,
        },
      })
    ).data,
});

export const getUserRestaurants = thunk;
export const {
  resetState: resetGetUserRestaurantsState,
  reset: resetGetUserRestaurants,
} = actions;
export default reducer;
