import { combineReducers } from "@reduxjs/toolkit";
import getirYemekTicketCancelSlice from "./getirYemekTicketCancelSlice";
import getirYemekTicketVerifySlice from "./getirYemekTicketVerifySlice";
import getirYemekTicketDeliverSlice from "./getirYemekTicketDeliverSlice";
import getirYemekTicketPrepareSlice from "./getirYemekTicketPrepareSlice";
import getTicketCancelOptionsSlice from "./getTicketCancelOptionsSlice";
import getirYemekGetRestaurantsSlice from "./getirYemekGetRestaurantsSlice";

// Slices
const getirYemekSlice = combineReducers({
  verifyTicket: getirYemekTicketVerifySlice,
  prepareTicket: getirYemekTicketPrepareSlice,
  deliverTicket: getirYemekTicketDeliverSlice,
  cancelOptions: getTicketCancelOptionsSlice,
  cancelTicket: getirYemekTicketCancelSlice,
  getRestaurants: getirYemekGetRestaurantsSlice,
});

export default getirYemekSlice;
