//https://api.pentegrasyon.net:9007/api/v1/CityDistrictNeighbourhood/GetCities

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateApi } from "../api";
import toast from "react-hot-toast";

const api = privateApi();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  loading: false,
  success: false,
  error: false,
  users: null,
};

const citiesSlice = createSlice({
  name: "getUsers",
  initialState: initialState,
  reducers: {
    resetGetUsersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    resetGetUsers: (state) => {
      state.users = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.users = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
        state.users = null;
      });
  },
});

export const getUsers = createAsyncThunk(
  "Users/GetUsers",
  async ({ pageNumber, pageSize, searchKey, active, verify, dealer, city }) => {
    try {
      const res = await api.get(`${baseURL}Users/GetUsers`, {
        params: {
          pageNumber,
          pageSize,
          searchKey,
          active,
          verify,
          dealer,
          city,
        },
      });

      //console.log(res.data);
      return res.data.data;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      throw err.message;
    }
  }
);

export const { resetGetUsersState, resetGetUsers } = getUsersSlice.actions;
export default getUsersSlice.reducer;
