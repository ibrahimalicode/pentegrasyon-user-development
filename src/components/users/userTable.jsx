import { formatDateString } from "../../utils/utils";
import UsersActions from "./usersActions";
import ChangeUsersStatus from "./userIsActive";
import ChangeUsersIsVerified from "./userIsVerified";

const UsersTable = ({ users, itemsPerPage, onSuccess }) => {
  return (
    <>
      <div className="border border-solid border-[--light-4] rounded-lg max-xl:overflow-x-scroll">
        <table className="w-full text-sm font-light min-w-[60rem]">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="first:pl-4 font-normal">Ad Soyad</th>
              <th className="irst:pl-4 font-normal">Rol</th>
              <th className="irst:pl-4 font-normal">iletişim</th>
              <th className="irst:pl-4 font-normal">Il</th>
              <th className="irst:pl-4 font-normal">Durum</th>
              <th className="irst:pl-4 font-normal text-center">Onaylı</th>
              <th className="irst:pl-4 font-normal">Kayıt Tarihi</th>
              <th className="irst:pl-4 font-normal text-center">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {users.map((data, index) => (
              <tr
                key={data.id}
                className="odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 last:border-b-0"
              >
                <td className="whitespace-nowrap text-[--black-2] pl-4 font-light first:font-normal">
                  {data.fullName}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {data.isDealer ? "Bayi" : "Musteri"}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {data.phoneNumber}
                  <br />
                  <span className="text-xs font-light text-[--gr-1]">
                    {data.email}
                  </span>
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {data.city}
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal relative">
                  <ChangeUsersStatus user={data} onSuccess={onSuccess} />
                </td>
                <td className="whitespace-nowrap text-center text-[--black-2] font-light first:font-normal">
                  <ChangeUsersIsVerified user={data} onSuccess={onSuccess} />
                </td>
                <td className="whitespace-nowrap text-[--black-2] font-light first:font-normal">
                  {formatDateString(data.createdDateTime)}
                </td>
                <td className="text-center text-[--black-2] font-light first:font-normal relative">
                  <UsersActions
                    index={index}
                    user={data}
                    itemsPerPage={itemsPerPage}
                    onSuccess={onSuccess}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
