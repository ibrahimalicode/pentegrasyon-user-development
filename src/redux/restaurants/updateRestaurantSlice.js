import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateRestaurant",
  actionType: "Restaurants/UpdateRestaurant",
  request: async ({
    restaurantId,
    dealerId,
    userId,
    name,
    phoneNumber,
    city,
    district,
    neighbourhood,
    address,
    latitude,
    longitude,
    isActive,
  }) =>
    (
      await api.put(
        "Restaurants/UpdateRestaurant",
        {
          dealerId,
          name,
          phoneNumber,
          city: city.value,
          district: district.value,
          neighbourhood: neighbourhood.value,
          address,
          latitude,
          longitude,
          isActive,
        },
        { params: { restaurantId, userId } }
      )
    ).data,
});

export const updateRestaurant = thunk;
export const {
  reset: resetUpdateRestaurant,
  resetState: resetUpdateRestaurantState,
} = actions;
export default reducer;
