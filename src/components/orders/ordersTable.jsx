//MODULEe

//COMP
import OrdersTableBody from "./ordersTableBody";

const OrdersTable = ({ inData }) => {
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
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
            {inData.map((data, i) => (
              <OrdersTableBody data={data} key={i} totalItems={inData.length} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrdersTable;
