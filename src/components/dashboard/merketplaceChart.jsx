import React, { useEffect } from "react";
import { initChart } from "./chart";

const data = {
  series: [35.1, 23.5, 2.4, 5.4, 10],
  colors: [
    "var(--red-1)",
    "var(--primary-1)",
    "var(--yellow-1)",
    "var(--red-2)",
    "var(--green-3)",
  ],
  labels: ["Yemeksepeti", "GetirYemek", "MigrosYemek", "Siparişim+", "GoFody"],
};

const MarketplaceChart = () => {
  useEffect(() => {
    const chartElement = document.getElementById("donut-chart");
    const cleanup = initChart(chartElement, data);

    // Cleanup function to avoid memory leaks
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <main className="max-md:w-full w-max flex justify-center bg-[--white-1] rounded-md border-2 border-solid border-[--light-1]">
      <div className="w-[26rem] max-lg:w-full h-[220px] overflow-hidden">
        <div className="w-full" id="donut-chart"></div>
      </div>
    </main>
  );
};

export default MarketplaceChart;
