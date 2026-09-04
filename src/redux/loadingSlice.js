import { createSlice } from "@reduxjs/toolkit";

// Counts in-flight thunks via matchers instead of a mutable module-level
// counter in a middleware, so overlapping requests can't get the global
// loader out of sync.

// Background requests that must NOT flash the full-screen loader: these
// fire on their own (Firestore push → ticket hydration) while the user is
// just looking at the list, and the overlay made the whole page blink on
// every new order / status change. Excluded from BOTH matchers so the
// counter stays balanced.
const SILENT_ACTIONS = ["Tickets/GetTicketById"];
const isSilent = (type) => SILENT_ACTIONS.some((a) => type.startsWith(a + "/"));

const loadingSlice = createSlice({
  name: "loading",
  initialState: { isLoading: false, pendingCount: 0 },
  reducers: {},
  extraReducers: (build) => {
    build
      .addMatcher(
        (action) => action.type.endsWith("/pending") && !isSilent(action.type),
        (state) => {
          state.pendingCount += 1;
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")) &&
          !isSilent(action.type),
        (state) => {
          state.pendingCount = Math.max(0, state.pendingCount - 1);
          state.isLoading = state.pendingCount > 0;
        }
      );
  },
});

export default loadingSlice.reducer;
