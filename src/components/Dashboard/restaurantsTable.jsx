const RestaurantsTable = () => {
  const restaurants = [
    { name: "Justin Lipshutz", sales: "1.000", amount: "100k", city: "Ankara" },
    { name: "Justin Lipshutz", sales: "1.000", amount: "100k", city: "Ankara" },
    { name: "Justin Lipshutz", sales: "1.000", amount: "100k", city: "Ankara" },
  ];

  return (
    <main className="w-full h-max pb-4 px-2 sm:px-9  bg-[--white-1] rounded-md border-2 border-solid border-[--light-1] max-sm:overflow-x-scroll">
      <table className="w-full text-center text-sm max-sm:min-w-[26rem]">
        <thead>
          <tr className="text-[--gr-1] font-light">
            <th className="font-light py-5 border-b border-solid border-[--light-1] text-start">
              Restoran Adı
            </th>
            <th className="font-light py-5 border-b border-solid border-[--light-1]">
              Toplam Satış
            </th>
            <th className="font-light py-5 border-b border-solid border-[--light-1]">
              Toplam Tutarı
            </th>
            <th className="font-light py-5 border-b border-solid border-[--light-1] text-end">
              İl
            </th>
          </tr>
        </thead>

        <tbody>
          {restaurants.map((rest, index) => (
            <tr key={index}>
              <td className="py-3.5 text-start">{rest.name}</td>
              <td className="py-3.5">{rest.sales}</td>
              <td className="py-3.5">{rest.amount}</td>
              <td className="py-3.5 text-end">{rest.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default RestaurantsTable;
