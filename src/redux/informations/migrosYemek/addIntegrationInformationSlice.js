import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addMigrosYemekIntegrationInformation",
  actionType: "Licenses/AddMigrosYemekIntegrationInformation",
  request: async (data) =>
    (
      await api.post(
        "IntegrationInformations/AddMigrosYemekIntegrationInformation",
        { ...data }
      )
    ).data,
});

export const addIntegrationInformation = thunk;
export const { reset: resetAddIntegrationInformation } = actions;
export default reducer;
