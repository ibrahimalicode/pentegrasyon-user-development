import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getCurrency",
  actionType: "Currencies/GetCurrencyByCurrencyCode",
  dataKey: "currency",
  request: async ({ currencyCode = "USD" }) =>
    (
      await api.get("Currencies/GetCurrencyByCurrencyCode", {
        params: { currencyCode },
      })
    ).data.data,
});

export const getCurrency = thunk;
export const { reset: resetGetCurrency } = actions;
export default reducer;
