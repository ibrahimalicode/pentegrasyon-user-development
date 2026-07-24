import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addGetirYemekIntegrationInformation",
  actionType: "IntegrationInformations/AddGetirYemekIntegrationInformation",
  request: async (data) =>
    (
      await api.post(
        "IntegrationInformations/AddGetirYemekIntegrationInformation",
        { ...data }
      )
    ).data,
});

export const addIntegrationInformation = thunk;
export const { reset: resetAddIntegrationInformation } = actions;
export default reducer;
