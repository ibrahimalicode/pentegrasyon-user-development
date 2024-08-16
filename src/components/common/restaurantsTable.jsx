import MenuI from "../../assets/icon/menu";
import ChangeRestaurantStatus from "../users/userRestaurantActions/restaurantIsActive";

const RestaurantsTable = ({ inData, Actions, totalItems, onSuccess }) => {
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
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
                className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors ${
                  totalItems < 8 ? "" : "last:border-b-0"
                } `}
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
                  <ChangeRestaurantStatus
                    restaurant={data}
                    onSuccess={onSuccess}
                  />
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] font-light first:font-normal relative">
                  <Actions
                    index={index}
                    restaurant={data}
                    onSuccess={onSuccess}
                    totalItems={totalItems}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default RestaurantsTable;
