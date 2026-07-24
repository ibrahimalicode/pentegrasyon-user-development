import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateCourierLoginCode",
  actionType: "Couriers/UpdateCourierLoginCode",
  request: async (data) => {
    console.log(data);
    const res = await api.put(
      "Couriers/UpdateCourierLoginCode",
      { ...data },
      {
        params: {
          ...data,
        },
      }
    );

    return res.data.data;
  },
});

export const updateCourierLoginCode = thunk;
export const { reset: resetUpdateCourierLoginCode } = actions;
export default reducer;
