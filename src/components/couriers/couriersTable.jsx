import { useState } from "react";
import EyeI from "../../assets/icon/eye";
import EyeInv from "../../assets/icon/eyeInv";
import Actions from "./actions/actions";
import EditCourierIsActive from "./actions/updateCourierIsActive";
import {
  TABLE,
  TABLE_CARD,
  TABLE_SCROLL,
  TD,
  TH,
  THEAD_ROW,
  TR,
} from "../common/tableStyles";
import { cn } from "../../lib/utils";

const CouriersTable = ({ inData, totalItems = inData.length, onSuccess }) => {
  const [showLoginCode, setShowLoginCode] = useState(null);

  function switchShowLoginCode(index) {
    setShowLoginCode(showLoginCode == index ? null : index);
  }

  return (
    <main className={TABLE_SCROLL}>
      <div className={cn(TABLE_CARD, "min-h-[30rem] min-w-[60rem]")}>
        <table className={TABLE}>
          <thead>
            <tr className={THEAD_ROW}>
              <th className={TH}>Ad</th>
              <th className={TH}>Tel No.</th>
              <th className={TH}>E-Posta</th>
              <th className={TH}>Teslimata</th>
              <th className={TH}>Giriş Kodu</th>
              <th className={cn(TH, "text-center")}>Durum</th>
              <th className={cn(TH, "text-center")}>İşlem</th>
            </tr>
          </thead>

          <tbody>
            {inData.map((data, index) => (
              <tr key={data.id} className={TR}>
                <td className={TD}>{data.username}</td>
                <td className={TD}>{data.phoneNumber}</td>
                <td className={TD}>{data.email}</td>
                <td
                  className={cn(
                    TD,
                    data.isOnline ? "text-[--green-1]" : "text-[--red-1]"
                  )}
                >
                  {data.isOnline ? "Uygun" : "Uygin Değil"}
                </td>
                <td className={TD}>
                  <button
                    className="flex items-center cursor-pointer"
                    onClick={() => switchShowLoginCode(index)}
                  >
                    <p
                      className={`min-w-16 ${
                        showLoginCode !== index && "hidden"
                      }`}
                    >
                      {data.loginCode}
                    </p>
                    <span>
                      {showLoginCode !== index ? (
                        <EyeInv className="size-[1rem]" />
                      ) : (
                        <EyeI className="size-[1rem]" />
                      )}
                    </span>
                  </button>
                </td>
                <td className={cn(TD, "text-center")}>
                  <EditCourierIsActive
                    courierData={data}
                    onSuccess={onSuccess}
                  />
                </td>
                <td className={cn(TD, "w-14 relative")}>
                  <Actions
                    index={index}
                    courier={data}
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

export default CouriersTable;
