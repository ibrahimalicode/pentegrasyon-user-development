import { privateApi } from "../api";
import { createApiSlice } from "../createApiSlice";

const api = privateApi();
const PAYTRURL = import.meta.env.VITE_PAYTR_URL;

const { thunk, reducer, actions } = createApiSlice({
  name: "getContext",
  actionType: "PayTR/GetContext",
  dataKey: "context",
  request: async ({ payment_amount, user_basket }) => {
    const res = await api.get(`${PAYTRURL}context`, {
      params: {
        payment_amount,
        user_basket,
      },
    });

    console.log(res.data);
    return res.data;
  },
});

export const getContext = thunk;
export const { resetState: resetGetContextState, reset: resetGetContext } =
  actions;
export default reducer;
