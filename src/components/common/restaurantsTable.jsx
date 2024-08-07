import MenuI from "../../assets/icon/menu";

const RestaurantsTable = ({ inData }) => {
  return (
    <div className="border border-solid border-[--light-4] rounded-lg max-xl:overflow-x-scroll">
      <table className="w-full text-sm font-light min-w-[60rem]">
        <thead>
          <tr className="bg-[--light-3] h-8 text-left">
            <th className="first:pl-4 font-normal">Restoran Adı</th>
            <th className="irst:pl-4 font-normal">Adres</th>
            <th className="irst:pl-4 font-normal">Telefon</th>
            <th className="irst:pl-4 font-normal">Il</th>
            <th className="irst:pl-4 font-normal">Durum</th>
            <th className="irst:pl-4 font-normal">İşlem</th>
          </tr>
        </thead>

        <tbody>
          {inData.map((data, index) => (
            <tr
              key={data.id}
              className="odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 last:border-b-0"
            >
              <td className="whitespace-nowrap text-[--black-2] pl-4 font-light first:font-normal">
                {data.name}
              </td>
              <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                {data.address}
              </td>
              <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                {data.phoneNumber}
              </td>
              <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                {data.city}
              </td>
              <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                <span
                  className={`text-xs font-normal ${
                    data.isActive
                      ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
                      : "text-[--red-1] bg-[--status-red] border-[--red-1]"
                  } px-3 py-1 border border-solid rounded-full`}
                >
                  ● {data.isActive ? "Aktif" : "Pasif"}
                </span>
              </td>
              <td className="whitespace-nowrap text-center text-[--black-2] font-light first:font-normal">
                <MenuI className="w-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsTable;
