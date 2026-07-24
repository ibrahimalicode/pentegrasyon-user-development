import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getRestaurantsMap",
  actionType: "Restaurants/getRestaurantsMap",
  dataKey: "entities",
  request: async (inData) => {
    const uniqueRestaurantIds = [
      ...new Set(inData.map((entity) => entity.restaurantId)),
    ];

    const restaurantPromises = uniqueRestaurantIds.map((restaurantId) =>
      api
        .get("Restaurants/GetRestaurantById", {
          params: {
            restaurantId,
          },
        })
        .then((response) => response.data.data)
    );

    const restaurants = await Promise.all(restaurantPromises);

    const restaurantMap = restaurants.reduce((acc, restaurant) => {
      acc[restaurant.id] = restaurant;
      return acc;
    }, {});

    const updatedInData = inData.map((entity) => {
      const restaurant = restaurantMap[entity.restaurantId];
      return {
        ...entity,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id,
      };
    });

    return updatedInData;
  },
});

export const getRestaurantsMap = thunk;
export const { reset: resetGetRestaurantsMap } = actions;
export default reducer;
