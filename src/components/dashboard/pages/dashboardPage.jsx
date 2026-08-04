import { useState } from "react";

import StatCard from "../statCard";
import SalesBar from "../salesBar";
import RestaurantsTable from "../restaurantsTable";
import MarketplaceChart from "../merketplaceChart";

const DashboardPage = () => {
  // Order KPIs are derived inside SalesBar (which owns the statistics
  // fetch and its filters) and lifted here so the cards can show them.
  const [orderTotals, setOrderTotals] = useState(null);

  return (
    // px-[4%] matches every other page; the old px-16 made the dashboard
    // the only screen with a different gutter.
    <section className="pt-16 px-[4%] pb-5 min-h-0">
      <div className="flex flex-col gap-4 py-4">
        <StatCard orderTotals={orderTotals} />
        {/* Chart beside the donut instead of stacked — the dashboard holds
            little data, so it should fit a screen without scrolling. */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full items-stretch">
          <div className="xl:col-span-2 min-w-0">
            <SalesBar onTotalsChange={setOrderTotals} />
          </div>
          <MarketplaceChart />
        </div>
        <RestaurantsTable />
      </div>
    </section>
  );
};

export default DashboardPage;
