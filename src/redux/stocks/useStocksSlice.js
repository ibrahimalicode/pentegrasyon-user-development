import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "useStocks",
  actionType: "LicenseStock/UseLicenseStock",
  request: async (params) =>
    (await api.put("LicenseStock/UseLicenseStock", {}, { params })).data,
});

export const _useStocks = thunk;
export const { reset: resetUseStocks, resetState: resetUseStocksState } =
  actions;
export default reducer;
