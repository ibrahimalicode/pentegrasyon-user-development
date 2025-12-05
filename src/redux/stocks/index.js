import { combineReducers } from "@reduxjs/toolkit";

// Slices
import getStocksSlice from "./getStocksSlice";
import useStocksSlice from "./useStocksSlice";

const stocksSlice = combineReducers({
  get: getStocksSlice,
  useStocks: useStocksSlice,
});

export default stocksSlice;
