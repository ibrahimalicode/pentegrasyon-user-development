import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getLicensePackages",
  actionType: "LicensePackages/GetLicensePackages",
  dataKey: "licensePackages",
  request: async () =>
    (await api.get("LicensePackages/GetLicensePackages")).data,
});

export const getLicensePackages = thunk;
export const {
  resetState: resetGetLicensePackagesState,
  reset: resetGetLicensePackages,
} = actions;
export default reducer;
