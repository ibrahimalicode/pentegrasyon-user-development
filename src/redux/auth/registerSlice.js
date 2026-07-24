import axios from "axios";
import { createApiSlice } from "../createApiSlice";

const baseURL = import.meta.env.VITE_BASE_URL;

const { thunk, reducer, actions } = createApiSlice({
  name: "registerUser",
  actionType: "Auth/registerUser",
  // public endpoint — raw axios, no auth interceptors
  request: async ({
    email,
    phoneNumber,
    password,
    firstName,
    lastName,
    city,
    district,
  }) =>
    (
      await axios.post(`${baseURL}Auth/UserRegister`, {
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        city,
        district,
      })
    ).data,
});

export const registerUser = thunk;
export const { reset: resetRgister, resetState: resetRgisterState } = actions;
export default reducer;
