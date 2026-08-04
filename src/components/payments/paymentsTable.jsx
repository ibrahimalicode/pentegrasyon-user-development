//MODULES
import { useSelector } from "react-redux";

//UTILS
import { formatDateString } from "../../utils/utils";
import PaymentLicenseType from "../../enums/paymentLicenseType";
import ChangePaymentStatus from "./actions/changePaymentStatus";
import Actions from "./actions/actions";
import {
  CELL_CHIP,
  TABLE,
  TABLE_CARD,
  TABLE_SCROLL,
  TD,
  TH,
  THEAD_ROW,
  TR,
} from "../common/tableStyles";
import { cn } from "../../lib/utils";

const PaymentsTable = ({ inData, totalItems = inData?.length }) => {
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
    <main className={TABLE_SCROLL}>
      <div className={cn(TABLE_CARD, "min-h-[30rem] min-w-[60rem]")}>
        <table className={TABLE}>
          <thead>
            <tr className={THEAD_ROW}>
              <th className={TH}>Ad Soyad</th>
              <th className={TH}>Sipariş No.</th>
              <th className={TH}>Ödeme Nedeni</th>
              <th className={TH}>Ödeme Tipi</th>
              <th className={TH}>Tutar</th>
              <th className={TH}>Durum</th>
              <th className={TH}>Tarih</th>
              <th className={cn(TH, "text-center")}>İşlem</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, index) => (
              <tr key={data.id} className={TR}>
                <td className={TD}>{user.fullName}</td>
                <td className={TD}>{data.orderNumber}</td>
                <td className={TD}>{PaymentLicenseType[data?.type]?.label}</td>
                <td className={TD}>
                  <a
                    href={formatFilePath(data.receiptFilePath)}
                    target="_blank"
                    className={
                      formatFilePath(data.receiptFilePath)
                        ? cn(CELL_CHIP, "hover:cursor-pointer")
                        : "pointer-events-none"
                    }
                  >
                    {data.provider}
                  </a>
                </td>

                <td className={TD}>{data.amount}</td>
                <td className={TD}>
                  <ChangePaymentStatus payment={data} />
                </td>
                <td className={cn(TD, "text-center")}>
                  {formatDateString({ dateString: data.createdDateTime })}
                </td>
                <td className={cn(TD, "w-14 relative")}>
                  <Actions
                    index={index}
                    payment={{
                      ...data,
                      docPath: formatFilePath(data.receiptFilePath),
                    }}
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

export default PaymentsTable;
