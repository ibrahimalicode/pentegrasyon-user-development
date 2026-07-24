import { createSlice } from "@reduxjs/toolkit";

// Counts in-flight thunks via matchers instead of a mutable module-level
// counter in a middleware, so overlapping requests can't get the global
// loader out of sync.
const loadingSlice = createSlice({
  name: "loading",
  initialState: { isLoading: false, pendingCount: 0 },
  reducers: {},
  extraReducers: (build) => {
    build
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.pendingCount += 1;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.pendingCount = Math.max(0, state.pendingCount - 1);
          state.isLoading = state.pendingCount > 0;
        }
      );
  },
});

export default loadingSlice.reducer;
