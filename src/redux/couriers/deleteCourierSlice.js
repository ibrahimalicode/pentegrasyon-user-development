import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "deleteCourier",
  actionType: "Couriers/DeleteCourierById",
  request: async (data) => {
    console.log(data);
    const res = await api.delete("Couriers/DeleteCourierById", {
      params: {
        ...data,
      },
    });

    return res.data.data;
  },
});

export const deleteCourier = thunk;
export const { reset: resetDeleteCourier } = actions;
export default reducer;
