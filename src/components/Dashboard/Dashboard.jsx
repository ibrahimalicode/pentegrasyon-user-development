import StatCard from "./statCard";
import SalesChart from "./salesChart";
import RestaurantsTable from "./restaurantsTable";
import MarketplaceChart from "./merketplaceChart";

const Dashboard = () => {
  return (
    <section className="lg:ml-[280px] pt-16 min-h-0">
      <div className="flex flex-col px-16 pt-4 pb-1.5 max-md:px-5">
        <StatCard />
        <SalesChart />
        <div className="flex pt-3 gap-5 w-full max-md:flex-col mt-1.5">
          <RestaurantsTable />
          <MarketplaceChart />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
