//MODULES
import { useSelector } from "react-redux";

//UTILS
import { formatDateString } from "../../utils/utils";
import PaymentLicenseType from "../../enums/paymentLicenseType";
import ChangePaymentStatus from "./actions/changePaymentStatus";

const PaymentsTable = ({ inData, totalItems = inData.length, onSuccess }) => {
  const { user } = useSelector((state) => state.user.getUser);

  function formatFilePath(filePath) {
    if (!filePath) return null;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const formattedPath = filePath.replace(
      /^C:\\inetpub\\wwwroot\\PentegrasyonAPI/,
      ""
    );

    const urlPath = formattedPath.replace(/\\/g, "/");
    return baseUrl.replace("/api/v1/", "") + urlPath;
  }

  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="pl-4 font-normal">Ad Soyad</th>
              <th className="font-normal">Sipariş No.</th>
              <th className="font-normal">Ürün Adı</th>
              <th className="font-normal">Ödeme Tipi</th>
              <th className="font-normal">Tutar</th>
              <th className="font-normal">Durum</th>
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
                  <a
                    href={formatFilePath(data.receiptFilePath)}
                    target="_blank"
                    className={`px-1 py-1.5 ${
                      formatFilePath(data.receiptFilePath)
                        ? "border border-[--primary-1] rounded-md hover:cursor-pointer"
                        : "pointer-events-none"
                    }`}
                  >
                    {data.provider}
                  </a>
                </td>

                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.amount}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  <ChangePaymentStatus payment={data} />
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light text-center">
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
