import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateUserInvoice",
  actionType: "Users/updateUserInvoice",
  request: async ({
    taxOffice,
    taxNumber,
    title,
    address,
    city,
    district,
    neighbourhood,
    tradeRegistryNumber,
    mersisNumber,
  }) =>
    (
      await api.put("Invoices/UpdateUserInvoiceAddress", {
        taxOffice,
        taxNumber,
        title,
        address,
        city: city.label,
        district: district.label,
        neighbourhood: neighbourhood.label,
        tradeRegistryNumber,
        mersisNumber,
      })
    ).data,
});

export const updateUserInvoice = thunk;
export const {
  reset: resetUpdateUserInvoice,
  resetState: resetUpdateUserInvoiceState,
} = actions;
export default reducer;
