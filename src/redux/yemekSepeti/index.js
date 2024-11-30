import { combineReducers } from "@reduxjs/toolkit";

// Slices
import yemekSepetiTicketVerifySlice from "./yemekSepetiTicketVerifySlice";
import yemekSepetiTicketPrepareSlice from "./yemekSepetiTicketPrepareSlice";
import yemekSepetiTicketDeliverSlice from "./yemekSepetiTicketDeliverSlice";
import yemekSepetiTicketCancelSlice from "./yemekSepetiTicketCancelSlice";
import yemekSepetiGetRestaurantsSlice from "./yemekSepetiGetRestaurantsSlice";
import yemekSepetiUpdateRestaurantStatusSlice from "./yemekSepetiUpdateRestaurantStatusSlice";
import yemekSepetiUpdateRestaurantCourierStatusSlice from "./yemekSepetiUpdateRestaurantCourierStatusSlice";
import yemekSepetiGetTicketCancelOptionsSlice from "./yemekSepetiGetTicketCancelOptionsSlice";

const yemekSepetiSlice = combineReducers({
  verifyTicket: yemekSepetiTicketVerifySlice,
  prepareTicket: yemekSepetiTicketPrepareSlice,
  deliverTicket: yemekSepetiTicketDeliverSlice,
  cancelTicket: yemekSepetiTicketCancelSlice,
  getRestaurants: yemekSepetiGetRestaurantsSlice,
  updateRestaurants: yemekSepetiUpdateRestaurantStatusSlice,
  updateRestaurantsCourier: yemekSepetiUpdateRestaurantCourierStatusSlice,
  getTicketCancelOptions: yemekSepetiGetTicketCancelOptionsSlice,
});

export default yemekSepetiSlice;
