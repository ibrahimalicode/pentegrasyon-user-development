//MODULE

//COMP
import React from "react";
import GetirYemekTableBody from "./getirYemek/getirYemekTableBody";
import YemekSepetiTableBody from "./yemekSepeti/yemekSepetiTableBody";

export const marketplaceTableBodies = [
  {
    TableBody: GetirYemekTableBody,
  },
  {
    TableBody: GetirYemekTableBody,
  },
  {
    TableBody: YemekSepetiTableBody,
  },
  {
    TableBody: YemekSepetiTableBody,
  },
];

const OrdersTable = ({ ordersData, setOrdersData }) => {
  function getMarketPlaceAssets(order) {
    const TableBodyComp =
      marketplaceTableBodies[order.marketplaceId]?.TableBody;

    return {
      TableBody: (
        <TableBodyComp
          order={order}
          totalItems={ordersData?.length}
          setOrdersData={setOrdersData}
        />
      ),
    };
  }

  // console.log(ordersData);

  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-max overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-10 text-left">
              <th></th>
              <th>Onay Kodu</th>
              <th>Restoran</th>
              <th>Tarih</th>
              <th>Müşteri Adı</th>
              <th>Bölge</th>
              <th>Kurye</th>
              <th>Tutar</th>
              <th className="w-28">Durum</th>
              <th className="pr-2">Yazdır</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map((order, i) => (
              <React.Fragment key={i}>
                {getMarketPlaceAssets(order)?.TableBody}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrdersTable;
