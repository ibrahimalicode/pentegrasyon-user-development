import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getGetirYemekIntegrationInformationByLicenseId",
  actionType:
    "IntegrationInformations/GetGetirYemekIntegrationInformationByLicenseId",
  dataKey: "infoData",
  request: async (licenseId) =>
    (
      await api.get(
        "IntegrationInformations/GetGetirYemekIntegrationInformationByLicenseId",
        { params: { licenseId } }
      )
    ).data.data,
});

export const getIntegrationInformationByLicenseId = thunk;
export const { reset: resetGetIntegrationInformationByLicenseId } = actions;
export default reducer;
