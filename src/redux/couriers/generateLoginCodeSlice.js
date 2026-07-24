import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "generateLoginCode",
  actionType: "Couriers/CreateLoginCode",
  dataKey: "code",
  request: async () =>
    (
      await api.put(
        "Couriers/CreateLoginCode",
        {},
        {
          params: {},
        }
      )
    ).data.data,
});

export const generateLoginCode = thunk;
export const { reset: resetGenerateLoginCode } = actions;
export default reducer;
