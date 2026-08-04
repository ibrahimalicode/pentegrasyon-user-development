import StatCard from "../statCard";
import SalesBar from "../salesBar";
import RestaurantsTable from "../restaurantsTable";
import MarketplaceChart from "../merketplaceChart";

const DashboardPage = () => {
  return (
    // px-[4%] matches every other page; the old px-16 made the dashboard
    // the only screen with a different gutter.
    <section className="pt-16 px-[4%] pb-6 min-h-0">
      <div className="flex flex-col gap-5 py-6">
        <StatCard />
        <SalesBar />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full items-start">
          <div className="lg:col-span-2 min-w-0">
            <RestaurantsTable />
          </div>
          <MarketplaceChart />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
