import MenuI from "../../assets/icon/menu";
import ChangeRestaurantStatus from "../users/userRestaurantActions/restaurantIsActive";

const RestaurantsTable = ({ inData, Actions, totalItems, onSuccess }) => {
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="first:pl-4 font-normal">Restoran</th>
              <th className="font-normal">Kullanıcı </th>
              <th className="font-normal">Telefon</th>
              <th className="font-normal">Il</th>
              <th className="font-normal">Durum</th>
              <th className="font-normal text-center">İşlem</th>
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
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.userName}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.phoneNumber}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.city}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  <ChangeRestaurantStatus
                    restaurant={data}
                    onSuccess={onSuccess}
                  />
                </td>
                <td className="whitespace-nowrap w-14 text-[--black-2] font-light relative">
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
