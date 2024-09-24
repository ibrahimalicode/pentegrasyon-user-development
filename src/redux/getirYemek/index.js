import { combineReducers } from "@reduxjs/toolkit";
import getirYemekTicketCancelSlice from "./getirYemekTicketCancelSlice";
import getirYemekTicketVerifySlice from "./getirYemekTicketVerifySlice";
import getirYemekTicketDeliverSlice from "./getirYemekTicketDeliverSlice";
import getirYemekTicketPrepareSlice from "./getirYemekTicketPrepareSlice";
import getTicketCancelOptionsSlice from "./getTicketCancelOptionsSlice";

// Slices

const getirYemekSlice = combineReducers({
  verifyTicket: getirYemekTicketVerifySlice,
  prepareTicket: getirYemekTicketPrepareSlice,
  deliverTicket: getirYemekTicketDeliverSlice,
  cancelOptions: getTicketCancelOptionsSlice,
  cancelTicket: getirYemekTicketCancelSlice,
});

export default getirYemekSlice;
