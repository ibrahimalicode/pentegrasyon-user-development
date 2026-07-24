import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateTrendyolYemekIntegrationInformation",
  actionType: "IntegrationInformations/UpdateTrendyolIntegrationInformation",
  request: async (data) =>
    (
      await api.put(
        "IntegrationInformations/UpdateTrendyolIntegrationInformation",
        { ...data },
        // Backend binds the DTO from body; only the record id binds from query.
        {
          params: {
            trendyolYemekIntegrationInformationId:
              data.trendyolYemekIntegrationInformationId,
          },
        }
      )
    ).data,
});

export const updateIntegrationInformation = thunk;
export const { reset: resetUpdateIntegrationInformation } = actions;
export default reducer;
