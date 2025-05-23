import { useState } from "react";
import EyeI from "../../assets/icon/eye";
import EyeInv from "../../assets/icon/eyeInv";
import Actions from "./actions/actions";
import EditCourierIsActive from "./actions/updateCourierIsActive";

const CouriersTable = ({ inData, totalItems = inData.length, onSuccess }) => {
  const [showLoginCode, setShowLoginCode] = useState(null);

  function switchShowLoginCode(index) {
    setShowLoginCode(showLoginCode == index ? null : index);
  }

  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="pl-4 font-normal">Ad</th>
              <th className="font-normal">Tel No.</th>
              <th className="font-normal">E-Posta</th>
              <th className="font-normal">Teslimata</th>
              <th className="font-normal">Giriş Kodu</th>
              <th className="font-normal text-center">Durum</th>
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
                <td className="whitespace-nowrap text-[--black-2] pl-4 font-normal">
                  {data.username}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.phoneNumber}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
                  {data.email}
                </td>
                <td
                  className={`whitespace-nowrap text-[--black-2] font-normal ${
                    data.isOnline ? "text-[--green-1]" : "text-[--red-1]"
                  }`}
                >
                  {data.isOnline ? "Uygun" : "Uygin Değil"}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light">
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
                <td className="whitespace-nowrap text-[--black-2] font-light text-center">
                  <EditCourierIsActive
                    courierData={data}
                    onSuccess={onSuccess}
                  />
                </td>
                <td className="whitespace-nowrap w-14 text-[--black-2] font-light relative">
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
