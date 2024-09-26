import { combineReducers } from "@reduxjs/toolkit";
import getirYemekTicketCancelSlice from "./getirYemekTicketCancelSlice";
import getirYemekTicketVerifySlice from "./getirYemekTicketVerifySlice";
import getirYemekTicketDeliverSlice from "./getirYemekTicketDeliverSlice";
import getirYemekTicketPrepareSlice from "./getirYemekTicketPrepareSlice";
import getTicketCancelOptionsSlice from "./getTicketCancelOptionsSlice";
import getirYemekGetRestaurantsSlice from "./getirYemekGetRestaurantsSlice";
import getirYemekUpdateRestaurantStatusSlice from "./getirYemekUpdateRestaurantStatusSlice";
import getirYemekUpdateRestaurantCourierStatusSlice from "./getirYemekUpdateRestaurantCourierStatusSlice";

// Slices
const getirYemekSlice = combineReducers({
  verifyTicket: getirYemekTicketVerifySlice,
  prepareTicket: getirYemekTicketPrepareSlice,
  deliverTicket: getirYemekTicketDeliverSlice,
  ticketCancelOptions: getTicketCancelOptionsSlice,
  cancelTicket: getirYemekTicketCancelSlice,
  getRestaurants: getirYemekGetRestaurantsSlice,
  updateRestaurants: getirYemekUpdateRestaurantStatusSlice,
  updateRestaurantsCourier: getirYemekUpdateRestaurantCourierStatusSlice,
});

export default getirYemekSlice;
