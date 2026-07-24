import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();

const { thunk, reducer, actions } = createApiSlice({
  name: "updateUserData",
  actionType: "Users/UpdateUser",
  request: async ({
    dealerId,
    email,
    phoneNumber,
    firstName,
    lastName,
    city,
    district,
  }) =>
    (
      await api.put("Users/UpdateUser", {
        dealerId,
        email,
        phoneNumber,
        firstName,
        lastName,
        city: city.label,
        district: district.label,
      })
    ).data,
});

export const updateUserData = thunk;
export const { reset: resetUpdateUserData, resetState: resetUpdateUserDataState } =
  actions;
export default reducer;
