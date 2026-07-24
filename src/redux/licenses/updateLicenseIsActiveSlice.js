import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateLicenseIsActive",
  actionType: "Licenses/UpdateLicenseActive",
  request: async ({ licenseId, active }) => {
    console.log(licenseId, active);
    const res = await api.put(
      "Licenses/UpdateLicenseActive",
      {},
      {
        params: { licenseId, active },
      }
    );

    console.log(res);
    return res.data;
  },
});

export const updateLicenseIsActive = thunk;
export const {
  reset: resetUpdateLicenseIsActive,
  resetState: resetUpdateLicenseIsActiveState,
} = actions;
export default reducer;
