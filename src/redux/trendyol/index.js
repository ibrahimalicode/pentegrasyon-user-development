import { combineReducers } from "@reduxjs/toolkit";

// Slices
import trendyolYemekTicketVerifySlice from "./trendyolYemekTicketVerifySlice";
import trendyolYemekTicketPrepareSlice from "./trendyolYemekTicketPrepareSlice";
import trendyolYemekTicketDeliverSlice from "./trendyolYemekTicketDeliverSlice";
import trendyolYemekTicketCancelSlice from "./trendyolYemekTicketCancelSlice";
import trendyolYemekGetRestaurantsSlice from "./trendyolYemekGetRestaurantsSlice";
import trendyolYemekUpdateRestaurantStatusSlice from "./trendyolYemekUpdateRestaurantStatusSlice";
import trendyolYemekUpdateRestaurantCourierStatusSlice from "./trendyolYemekUpdateRestaurantCourierStatusSlice";
import trendyolYemekGetTicketCancelOptionsSlice from "./trendyolYemekGetTicketCancelOptionsSlice";

const trendyolYemekSlice = combineReducers({
  verifyTicket: trendyolYemekTicketVerifySlice,
  prepareTicket: trendyolYemekTicketPrepareSlice,
  deliverTicket: trendyolYemekTicketDeliverSlice,
  cancelTicket: trendyolYemekTicketCancelSlice,
  getRestaurants: trendyolYemekGetRestaurantsSlice,
  updateRestaurants: trendyolYemekUpdateRestaurantStatusSlice,
  updateRestaurantsCourier: trendyolYemekUpdateRestaurantCourierStatusSlice,
  getTicketCancelOptions: trendyolYemekGetTicketCancelOptionsSlice,
});

export default trendyolYemekSlice;
