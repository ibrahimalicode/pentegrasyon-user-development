//MODULES
import { useSelector } from "react-redux";

//UTILS
import { formatDateString } from "../../utils/utils";
import PaymentStatus from "../../enums/paymentStatus";
import PaymentLicenseType from "../../enums/paymentLicenseType";

const PaymentsTable = ({ inData, totalItems = inData.length, onSuccess }) => {
  const { user } = useSelector((state) => state.user.getUser);
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="pl-4 font-normal">Ad Soyad</th>
              <th className="font-normal">Sipariş No.</th>
              <th className="font-normal">Sebep</th>
              <th className="font-normal">Method</th>
              <th className="font-normal">Amount</th>
              <th className="font-normal">Durum</th>
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
                  {user.fullName}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.orderNumber}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {PaymentLicenseType[data?.type]?.label}
                </td>

                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.paymentType}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.amount}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {PaymentStatus[data?.status]?.label}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {user?.city}
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
