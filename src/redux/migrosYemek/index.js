import { combineReducers } from "@reduxjs/toolkit";

// Slices
import migrosYemekTicketVerifySlice from "./migrosYemekTicketVerifySlice";
import migrosYemekTicketPrepareSlice from "./migrosYemekTicketPrepareSlice";
import migrosYemekTicketDeliverSlice from "./migrosYemekTicketDeliverSlice";
import migrosYemekTicketCancelSlice from "./migrosYemekTicketCancelSlice";
import migrosYemekGetRestaurantsSlice from "./migrosYemekGetRestaurantsSlice";
import migrosYemekUpdateRestaurantStatusSlice from "./migrosYemekUpdateRestaurantStatusSlice";
import migrosYemekUpdateRestaurantCourierStatusSlice from "./migrosYemekUpdateRestaurantCourierStatusSlice";
import migrosYemekGetTicketCancelOptionsSlice from "./migrosYemekGetTicketCancelOptionsSlice";

const migrosYemekSlice = combineReducers({
  verifyTicket: migrosYemekTicketVerifySlice,
  prepareTicket: migrosYemekTicketPrepareSlice,
  deliverTicket: migrosYemekTicketDeliverSlice,
  cancelTicket: migrosYemekTicketCancelSlice,
  getRestaurants: migrosYemekGetRestaurantsSlice,
  updateRestaurants: migrosYemekUpdateRestaurantStatusSlice,
  updateRestaurantsCourier: migrosYemekUpdateRestaurantCourierStatusSlice,
  getTicketCancelOptions: migrosYemekGetTicketCancelOptionsSlice,
});

export default migrosYemekSlice;
