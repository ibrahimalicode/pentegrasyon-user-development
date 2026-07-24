import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updatePaketNetIntegrationInformation",
  actionType: "IntegrationInformations/UpdatePaketNetIntegrationInformation",
  request: async (data) =>
    (
      await api.put(
        "IntegrationInformations/UpdatePaketNetIntegrationInformation",
        { ...data },
        // Backend binds the DTO from body; only the record id binds from query.
        {
          params: {
            PaketNetIntegrationInformationId:
              data.PaketNetIntegrationInformationId,
          },
        }
      )
    ).data,
});

export const updateIntegrationInformation = thunk;
export const { reset: resetUpdateIntegrationInformation } = actions;
export default reducer;
