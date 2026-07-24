import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Factory for the standard API slice shape used across the app:
//   { loading, success, error, [dataKey] }
//
// Ported from the admin panel. One deliberate difference: the default
// rejected payload always carries BOTH `message` and `message_TR`, because
// components here read either one. The api.js interceptor sets err.message
// to a Turkish string, so both fields end up user-presentable. Backend
// responses that lack message_TR entirely (middleware plain-text
// rejections, framework 401/400s, raw PayTR returns) fall through to the
// interceptor-derived message.
//
// - `name`        createSlice name
// - `actionType`  createAsyncThunk action type string (e.g. "Tickets/GetTickets")
// - `dataKey`     name of the state field holding the response payload (default "data")
// - `request`     async (arg) => payload — performs the API call and returns what
//                 should be stored in state[dataKey]
// - `mapError`    optional (err) => rejected payload, for slices that need a
//                 non-standard error shape
// - `mapRejected` optional (payload, arg) => stored error, for slices whose
//                 rejected reducer enriches the error with fields derived
//                 from the thunk argument (e.g. the ticket-action slices
//                 stamp `ticketId` so the orders table can show the failure
//                 on the right row)
//
// Returns { thunk, reducer, actions } where actions = { resetState, reset }:
//   resetState clears flags but keeps the data; reset clears everything.
// Slice files re-export these under their historical names so consumers
// (components, feature index.js) keep working unchanged.
export function createApiSlice({
  name,
  actionType,
  dataKey = "data",
  request,
  mapError,
  mapRejected,
}) {
  const thunk = createAsyncThunk(
    actionType,
    async (arg, { rejectWithValue }) => {
      try {
        return await request(arg);
      } catch (err) {
        if (mapError) return rejectWithValue(mapError(err));
        const data = err?.response?.data;
        if (data && typeof data === "object") {
          return rejectWithValue({
            ...data,
            message: data.message ?? err.message,
            message_TR: data.message_TR ?? err.message,
          });
        }
        return rejectWithValue({ message_TR: err.message, message: err.message });
      }
    }
  );

  const initialState = {
    loading: false,
    success: false,
    error: null,
    [dataKey]: null,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      resetState: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      },
      reset: () => initialState,
    },
    extraReducers: (build) => {
      build
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
          state[dataKey] = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state[dataKey] = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = mapRejected
            ? mapRejected(action.payload, action.meta.arg)
            : action.payload;
          state[dataKey] = null;
        });
    },
  });

  return { thunk, reducer: slice.reducer, actions: slice.actions };
}
