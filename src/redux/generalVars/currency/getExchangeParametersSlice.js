import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getExchangeParameter",
  actionType: "GeneralVariables/GetExchangeParameters",
  dataKey: "exchangeParameter",
  request: async () =>
    (await api.get("GeneralVariables/GetExchangeParameters")).data.data,
});

export const getExchangeParameter = thunk;
export const { reset: resetGetExchangeParameter } = actions;
export default reducer;
