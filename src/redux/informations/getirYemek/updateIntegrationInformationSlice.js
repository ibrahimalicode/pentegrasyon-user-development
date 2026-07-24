import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateGetirYemekIntegrationInformation",
  actionType: "IntegrationInformations/UpdateGetirYemekIntegrationInformation",
  request: async (data) =>
    (
      await api.put(
        "IntegrationInformations/UpdateGetirYemekIntegrationInformation",
        { ...data },
        // Backend binds the DTO from body; only the record id binds from query.
        {
          params: {
            getirYemekIntegrationInformationId:
              data.getirYemekIntegrationInformationId,
          },
        }
      )
    ).data,
});

export const updateIntegrationInformation = thunk;
export const { reset: resetUpdateIntegrationInformation } = actions;
export default reducer;
