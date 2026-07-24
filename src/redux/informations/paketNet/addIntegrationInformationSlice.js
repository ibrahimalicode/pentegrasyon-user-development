import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addPaketNetIntegrationInformation",
  actionType: "IntegrationInformations/AddPaketNetIntegrationInformation",
  request: async (data) =>
    (
      await api.post(
        "IntegrationInformations/AddPaketNetIntegrationInformation",
        { ...data }
      )
    ).data,
});

export const addIntegrationInformation = thunk;
export const { reset: resetAddIntegrationInformation } = actions;
export default reducer;
