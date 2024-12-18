import { formatDateString } from "../../utils/utils";

const PaymentsTable = ({ inData, totalItems = inData.length, onSuccess }) => {
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="pl-4 font-normal">Ad Soyad</th>
              <th className="font-normal">Durum</th>
              <th className="font-normal">Method</th>
              <th className="font-normal">Amount</th>
              <th className="font-normal">Adres</th>
              <th className="font-normal">İl</th>
              <th className="font-normal text-center">Tarih</th>
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
                <td className="whitespace-nowrap text-[--black-2] pl-4 font-normal">
                  {data.username}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.status}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.paymentType}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.amount}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data?.adres}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data?.city}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {formatDateString({ dateString: data.createdDateTime })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PaymentsTable;
