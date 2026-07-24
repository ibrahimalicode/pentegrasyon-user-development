import { privateApi } from "../../api";
import { createApiSlice } from "../../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "getLicenseStatistics",
  actionType: "Statistics/GetLicenseStatistics",
  request: async () =>
    (await api.get("Statistics/GetLicenseStatistics")).data.data,
  mapError: (err) => {
    console.log(err);
    if (err?.response?.data) {
      return err.response.data;
    }
    return { message_TR: err.message };
  },
});

export const getLicenseStatistics = thunk;
export const { reset: resetGetLicenseStatistics } = actions;
export default reducer;
