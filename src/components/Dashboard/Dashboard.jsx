import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import RestaurantTable from "./RestaurantTable";
import MarketplaceChart from "./MarketplaceChart";

const Dashboard = () => {
  const statCards = [
    {
      title: "Toplam Restoran",
      value: 856,
      unit: "Restoran",
      percentage: 10.0,
      active: 430,
      passive: 426,
    },
    {
      title: "Toplam Lisans",
      value: 3342,
      unit: "Lisans",
      percentage: 22.0,
      active: 430,
      passive: 426,
    },
    {
      title: "Toplam Müşteri",
      value: 77,
      unit: "Kullanıcı",
      percentage: 12.0,
      active: 430,
      passive: 426,
    },
    {
      title: "Toplam Bayi",
      value: 17,
      unit: "Bayi",
      percentage: -7.0,
      active: 430,
      passive: 426,
    },
  ];

  return (
    <main className="flex flex-col px-16 pt-4 pb-1.5 max-md:px-5">
      <section className="justify-between max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
      </section>
      <SalesChart />
      <section className="justify-between py-3 mt-1.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <RestaurantTable />
          <MarketplaceChart />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
