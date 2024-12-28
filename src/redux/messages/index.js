import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getMessagesSlice from "./getMessagesSlice";
import updateMessageStatusSlice from "./updateMessageStatusSlice";

const messagesSlice = combineReducers({
  getMessages: getMessagesSlice,
  updateMessageStatus: updateMessageStatusSlice,
});

export default messagesSlice;
