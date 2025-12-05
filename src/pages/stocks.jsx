import { Route, Routes } from "react-router-dom";
import StocksPage from "../components/stock/pages/stocksPage";
import NotFound from "./404";

const Stocks = () => {
  return (
    <Routes>
      <Route path="/" element={<StocksPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Stocks;
