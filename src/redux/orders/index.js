import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getOrdersSlice from "./getOrdersSlice";
import updateTicketAutomationVariableSlice from "./updateTicketAutomationVariableSlice";
import updateOrderCourierSlice from "./updateOrderCourierSlice";
import getOrderCompensationSlice from "./getOrderCompensationSlice";
import getRestaurantsStatusSlice from "./getRestaurantsStatusSlice";
import getAutomationVariablesSlice from "./getAutomationVariablesSlice";
import getTicketByIdSlice from "./getTicketByIdSlice";
import getTicketTimelineSlice from "./getTicketTimelineSlice";
import getCouriersForOrdersSlice from "./getCouriersForOrdersSlice";

const ordersSlice = combineReducers({
  get: getOrdersSlice,
  getByID: getTicketByIdSlice,
  timeline: getTicketTimelineSlice,
  updateCourier: updateOrderCourierSlice,
  getWithCouriers: getCouriersForOrdersSlice,
  getAutomationVariables: getAutomationVariablesSlice,
  updateAutomationVars: updateTicketAutomationVariableSlice,
  getOrderCompensation: getOrderCompensationSlice,
  getRestaurantsStatus: getRestaurantsStatusSlice,
});

export default ordersSlice;
