import { TrendDownI, TrendUpI } from "../../assets/icon";

const StatCard = () => {
  function percentageClass(percentage) {
    const isPositive = percentage >= 0;

    if (isPositive) {
      return "text-[--green-1] bg-[--status-green]";
    } else {
      return "text-[--red-1] bg-[--status-red]";
    }
  }

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
    <main className="w-full flex gap-5 max-md:flex-col">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="w-full flex flex-col px-5 py-3 gap-3 bg-[--white-1] rounded-md border-2 border-solid border-[--light-1]"
        >
          <div className="w-full flex justify-between items-center">
            <h1 className="font-bold">{card.title}</h1>

            <div
              className={`w-max flex items-center whitespace-nowrap rounded-[50px] text-xs py-1 px-1.5 ${percentageClass(
                card.percentage
              )}`}
            >
              {card.percentage >= 0 ? <TrendUpI /> : <TrendDownI />}
              {Math.abs(card.percentage)}%
            </div>
          </div>

          <div className="w-full flex justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {card.value.toLocaleString()}
              </h1>
              <div className="text-[--gr-2] text-sm mt-1.5">{card.unit}</div>
            </div>

            <div>
              <div className="flex gap-1.5 justify-between items-center text-xs text-[--green-1] font-bold">
                <span>{card.active}</span>
                <span className="px-4 py-1 border border-solid border-green-500 border-opacity-50 rounded-[54px]">
                  Aktif
                </span>
              </div>
              <div className="flex gap-1.5 justify-between items-center text-xs text-[--gr-1] font-bold mt-1.5">
                <span>{card.passive}</span>
                <span className="px-4 py-1 border border-solid border-slate-500 border-opacity-50 rounded-[54px]">
                  Pasif
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default StatCard;
