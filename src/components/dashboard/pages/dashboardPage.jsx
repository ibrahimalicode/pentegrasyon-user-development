import { useState } from "react";

import StatCard from "../statCard";
import SalesBar from "../salesBar";
import RestaurantsTable from "../restaurantsTable";
import MarketplaceChart from "../merketplaceChart";
import DownloadDesktopButton from "../../common/downloadDesktopButton";

const DashboardPage = () => {
  // Order KPIs are derived inside SalesBar (which owns the statistics
  // fetch and its filters) and lifted here so the cards can show them.
  const [orderTotals, setOrderTotals] = useState(null);

  return (
    // px-[4%] matches every other page; the old px-16 made the dashboard
    // the only screen with a different gutter.
    <section className="pt-20 sm:pt-[5.25rem] px-[4%] pb-5 min-h-0">
      <div className="flex flex-col gap-4 py-4">
        {/* The dashboard has no toolbar, so the desktop-app download gets a
            slim row of its own above the cards. */}
        <div className="flex justify-end">
          <DownloadDesktopButton />
        </div>
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
