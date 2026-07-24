import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addUserInvoice",
  actionType: "Users/addUserInvoice",
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
      await api.post("Invoices/AddUserInvoiceAddress", {
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

export const addUserInvoice = thunk;
export const { reset: resetAddUserInvoice } = actions;
export default reducer;
