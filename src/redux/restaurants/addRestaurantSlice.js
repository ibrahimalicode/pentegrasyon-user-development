import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addRestaurant",
  actionType: "Restaurants/AddRestaurant",
  request: async ({
    name,
    phoneNumber,
    latitude,
    longitude,
    city,
    district,
    neighbourhood,
    address,
    isActive,
  }) =>
    (
      await api.post("Restaurants/AddRestaurant", {
        name,
        phoneNumber,
        latitude,
        longitude,
        city: city.value,
        district: district.value,
        neighbourhood: neighbourhood.value,
        address,
        isActive,
      })
    ).data,
});

export const addRestaurant = thunk;
export const { reset: resetAddRestaurant, resetState: resetAddRestaurantState } =
  actions;
export default reducer;
