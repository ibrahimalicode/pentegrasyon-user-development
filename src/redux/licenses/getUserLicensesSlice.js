import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getUserLicenses",
  actionType: "Licenses/GetLicensesByUserId",
  dataKey: "userLicenses",
  request: async ({ userId, pageNumber = null, pageSize = null }) =>
    (
      await api.get("Licenses/GetLicensesByUserId", {
        params: {
          userId,
          pageNumber,
          pageSize,
        },
      })
    ).data,
});

export const getUserLicenses = thunk;
export const {
  resetState: resetGetUserLicensesState,
  reset: resetGetUserLicenses,
} = actions;
export default reducer;
