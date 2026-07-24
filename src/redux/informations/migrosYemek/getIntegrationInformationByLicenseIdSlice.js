import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getMigrosYemekIntegrationInformationByLicenseId",
  actionType:
    "IntegrationInformations/GetMigrosYemekIntegrationInformationByLicenseId",
  dataKey: "infoData",
  request: async (licenseId) =>
    (
      await api.get(
        "IntegrationInformations/GetMigrosYemekIntegrationInformationByLicenseId",
        { params: { licenseId } }
      )
    ).data.data,
});

export const getIntegrationInformationByLicenseId = thunk;
export const { reset: resetGetIntegrationInformationByLicenseId } = actions;
export default reducer;
