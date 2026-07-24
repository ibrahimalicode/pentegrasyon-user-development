import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getAdverts",
  actionType: "Adverts/GetAdvertsDisplay",
  dataKey: "adverts",
  request: async () => (await api.get("Adverts/GetAdvertsDisplay")).data.data,
  mapError: (err) => {
    console.log(err);
    if (err?.response?.data) return err.response.data;
    return { message_TR: err.message };
  },
});

export const getAdverts = thunk;
export const { reset: resetGetAdverts } = actions;
export default reducer;
