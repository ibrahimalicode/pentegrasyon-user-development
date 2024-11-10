import React from "react";
import order from "../enums/order";
import GetirYemekPrintOrder from "../components/orders/getirYemek/getirYemekPrintOrder";

const Test = () => {
  return (
    <main className="mt-28">
      <GetirYemekPrintOrder order={order} />
    </main>
  );
};

export default Test;
