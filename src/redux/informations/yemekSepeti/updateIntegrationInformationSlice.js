import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateYemekSepetiIntegrationInformation",
  actionType: "IntegrationInformations/UpdateYemekSepetiIntegrationInformation",
  request: async (data) =>
    (
      await api.put(
        "IntegrationInformations/UpdateYemekSepetiIntegrationInformation",
        { ...data },
        // Backend binds the DTO from body; only the record id binds from query.
        // Sending the full DTO as query leaked API keys into server logs.
        {
          params: {
            yemekSepetiIntegrationInformationId:
              data.yemekSepetiIntegrationInformationId,
          },
        }
      )
    ).data,
});

export const updateIntegrationInformation = thunk;
export const { reset: resetUpdateIntegrationInformation } = actions;
export default reducer;
