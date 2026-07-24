import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addYemekSepetiIntegrationInformation",
  actionType: "IntegrationInformations/AddYemekSepetiIntegrationInformation",
  request: async (data) =>
    (
      await api.post(
        "IntegrationInformations/AddYemekSepetiIntegrationInformation",
        { ...data }
      )
    ).data,
});

export const addIntegrationInformation = thunk;
export const { reset: resetAddIntegrationInformation } = actions;
export default reducer;
