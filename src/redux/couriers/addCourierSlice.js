import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addCourier",
  actionType: "Couriers/AddCourier",
  request: async (data) =>
    (
      await api.post(
        "Couriers/AddCourier",
        { ...data },
        {
          params: {
            ...data,
          },
        }
      )
    ).data.data,
});

export const addCourier = thunk;
export const { reset: resetAddCourier } = actions;
export default reducer;
