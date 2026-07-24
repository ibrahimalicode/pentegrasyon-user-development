import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "addLicense",
  actionType: "Licenses/AddLicense",
  request: async ({
    restaurantId,
    userId,
    marketplaceId,
    startDateTime,
    endDateTime,
    isActive,
    licensePackageTime,
    licensePackageTotalPrice,
    licensePackageId,
  }) =>
    (
      await api.post("Licenses/AddLicense", {
        restaurantId,
        userId,
        marketplaceId,
        startDateTime,
        endDateTime,
        isActive,
        licensePackageTime,
        licensePackageTotalPrice,
        licensePackageId,
      })
    ).data,
});

export const addLicense = thunk;
export const { reset: resetAddLicense, resetState: resetAddLicenseState } =
  actions;
export default reducer;
