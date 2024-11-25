import { combineReducers } from "@reduxjs/toolkit";

// Slices
import yemekSepetiTicketVerifySlice from "./yemekSepetiTicketVerifySlice";
import yemekSepetiTicketPrepareSlice from "./yemekSepetiTicketPrepareSlice";
import yemekSepetiTicketDeliverSlice from "./yemekSepetiTicketDeliverSlice";
import yemekSepetiTicketCancelSlice from "./yemekSepetiTicketCancelSlice";

const yemekSepetiSlice = combineReducers({
  verifyTicket: yemekSepetiTicketVerifySlice,
  prepareTicket: yemekSepetiTicketPrepareSlice,
  deliverTicket: yemekSepetiTicketDeliverSlice,
  cancelTicket: yemekSepetiTicketCancelSlice,
});

export default yemekSepetiSlice;
