import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateMigrosYemekIntegrationInformation",
  actionType: "Licenses/UpdateMigrosYemekIntegrationInformation",
  request: async (data) =>
    (
      await api.put(
        "IntegrationInformations/UpdateMigrosYemekIntegrationInformation",
        { ...data },
        // Backend binds the DTO from body; only the record id binds from query.
        {
          params: {
            MigrosYemekIntegrationInformationId:
              data.MigrosYemekIntegrationInformationId,
          },
        }
      )
    ).data,
});

export const updateIntegrationInformation = thunk;
export const { reset: resetUpdateIntegrationInformation } = actions;
export default reducer;
