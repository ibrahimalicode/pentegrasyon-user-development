import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateCourier",
  actionType: "Couriers/UpdateCourier",
  request: async (data) => {
    // Backend binds UpdateCourierDTO from body; only courierId binds from query.
    const res = await api.put(
      "Couriers/UpdateCourier",
      { ...data },
      { params: { courierId: data.courierId } }
    );

    return res.data.data;
  },
});

export const updateCourier = thunk;
export const { reset: resetUpdateCourier } = actions;
export default reducer;
