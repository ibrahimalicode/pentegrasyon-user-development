import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addTrendyolYemekIntegrationInformation",
  actionType: "IntegrationInformations/AddTrendyolIntegrationInformation",
  request: async (data) =>
    (
      await api.post(
        "IntegrationInformations/AddTrendyolIntegrationInformation",
        { ...data }
      )
    ).data,
});

export const addIntegrationInformation = thunk;
export const { reset: resetAddIntegrationInformation } = actions;
export default reducer;
