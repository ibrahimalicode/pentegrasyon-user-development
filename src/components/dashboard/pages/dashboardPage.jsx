import StatCard from "../statCard";
import SalesChart from "../salesChart";
import RestaurantsTable from "../restaurantsTable";
import MarketplaceChart from "../merketplaceChart";

const DashboardPage = () => {
  return (
    <section className="lg:ml-[280px] pt-20 min-h-0">
      <div className="flex flex-col px-16 max-md:px-5">
        <StatCard />
        <SalesChart />
        <div className="flex gap-5 w-full max-md:flex-col mt-3">
          <RestaurantsTable />
          <MarketplaceChart />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
