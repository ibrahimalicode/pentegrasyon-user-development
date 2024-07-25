import CustomInput from "../components/common/CustomInput";
import { useState } from "react";
import MenuI from "../assets/icon/menu";

const tablesData = [
  {
    name: "Ibrahim Ali",
    email: "jessica.hanson@example.com",
    phone: "+90 505 843 3855",
    city: "Istanbul",
    status: "Aktif",
    approval: "Onaylı",
    date: "5/27/15",
  },
  {
    name: "Ali Veli",
    email: "ali.veli@example.com",
    phone: "+90 505 843 3856",
    city: "Ankara",
    status: "Pasif",
    approval: "Onaylanmadı",
    date: "6/15/16",
  },
  {
    name: "Emre Yılmaz",
    email: "emre.yilmaz@example.com",
    phone: "+90 505 843 3857",
    city: "Izmir",
    status: "Aktif",
    approval: "Onaylı",
    date: "7/22/17",
  },
  {
    name: "Merve Demir",
    email: "merve.demir@example.com",
    phone: "+90 505 843 3858",
    city: "Antalya",
    status: "Aktif",
    approval: "Onaylı",
    date: "8/30/18",
  },
  {
    name: "Okan Kaya",
    email: "okan.kaya@example.com",
    phone: "+90 505 843 3859",
    city: "Istanbul",
    status: "Pasif",
    approval: "Onaylanmadı",
    date: "9/18/19",
  },
  {
    name: "Selin Yurt",
    email: "selin.yurt@example.com",
    phone: "+90 505 843 3860",
    city: "Ankara",
    status: "Aktif",
    approval: "Onaylı",
    date: "10/25/20",
  },
  {
    name: "Yasin Çelik",
    email: "yasin.celik@example.com",
    phone: "+90 505 843 3861",
    city: "Izmir",
    status: "Pasif",
    approval: "Onaylanmadı",
    date: "11/10/21",
  },
  {
    name: "Gözde Kaya",
    email: "gozde.kaya@example.com",
    phone: "+90 505 843 3862",
    city: "Antalya",
    status: "Aktif",
    approval: "Onaylı",
    date: "12/05/22",
  },
];

const Users = () => {
  const [searchVal, setSearchVal] = useState("");
  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-24 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Customers</h2>
      </div>

      {/* ACTIONS/BUTTONS */}
      <div className="w-full flex justify-between items-center mb-6 flex-wrap gap-2">
        <div className="flex items-center w-full max-w-sm max-sm:order-2">
          <CustomInput
            onChange={setSearchVal}
            value={searchVal}
            placeholder="Search..."
            className2="mt-[0px] w-full"
            className="mt-[0px] py-[.7rem] w-[100%] focus:outline-none"
          />
        </div>

        <div className="flex gap-2 max-sm:order-1">
          <button className="bg-[--primary-2] text-[--white-1] h-11 px-3 rounded-md text-sm font-normal border-solid border-[--primary-2]">
            Customers
          </button>
          <button className="text-[--primary-2] h-11 px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]">
            Sellers
          </button>
          <button className="text-[--primary-2] h-11 px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]">
            Filter
          </button>
          <button className="text-[--primary-2] h-11 px-3 rounded-md text-sm font-normal border-[1.5px] border-solid border-[--primary-2]">
            Add user
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="border border-solid border-[--light-4] rounded-lg overflow-x-scroll">
        <table className="w-full text-sm font-light min-w-[50rem]">
          <thead>
            <tr className="bg-[--light-3] h-8">
              <th className="first:pl-4 font-normal first:text-left text-center">
                Ad Soyad
              </th>
              <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                E-Posta
              </th>
              <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                Il
              </th>
              <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                Durum
              </th>
              <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                Onaylı
              </th>
              <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                Kayıt Tarihi
              </th>
              <th className="irst:pl-4 font-normal first:text-left last:text-left text-center">
                İşlem
              </th>
            </tr>
          </thead>

          <tbody>
            {tablesData.map((data, index) => (
              <tr
                key={index}
                className="odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 last:border-b-0"
              >
                <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                  {data.name}
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                  {data.phone}
                  <p className="text-xs font-light text-[--gr-1]">
                    {data.email}
                  </p>
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                  {data.city}
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                  <span
                    className={`text-xs font-normal ${
                      data.status === "Aktif"
                        ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
                        : "text-[--red-1] bg-[--status-red] border-[--red-1]"
                    } px-3 py-1 border border-solid rounded-full`}
                  >
                    ● {data.status}
                  </span>
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                  <span
                    className={`text-xs font-normal ${
                      data.approval === "Onaylı"
                        ? "text-[--green-1] bg-[--status-green] border-[--green-1]"
                        : "text-[--black-1] bg-[--light-4]"
                    } px-3 py-1 border border-solid rounded-full`}
                  >
                    ● {data.approval}
                  </span>
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                  {data.date}
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] first:text-left last:text-right first:pl-4 font-light first:font-normal">
                  <MenuI className="w-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full self-end bg-red-400">g</div>
    </section>
  );
};

export default Users;
