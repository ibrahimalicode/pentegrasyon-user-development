import { formatDateString } from "../../utils/utils";
import UsersActions from "./userActions/usersActions";
import ChangeUsersStatus from "./userIsActive";
import ChangeUsersIsVerified from "./userIsVerified";

const UsersTable = ({ users, itemsPerPage, onSuccess }) => {
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[60rem] overflow-hidden">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-8 text-left">
              <th className="first:pl-4 font-normal">Ad Soyad</th>
              <th className="font-normal">Rol</th>
              <th className="font-normal">iletişim</th>
              <th className="font-normal">Il</th>
              <th className="font-normal">Durum</th>
              <th className="font-normal text-center">Onaylı</th>
              <th className="font-normal">Kayıt Tarihi</th>
              <th className="font-normal text-center">İşlem</th>
            </tr>
          </thead>

          <tbody>
            {users.map((data, index) => (
              <tr
                key={data.id}
                className={`odd:bg-[--white-1] even:bg-[--table-odd] h-14 border border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors ${
                  users.length < 8 ? "" : "last:border-b-0"
                } `}
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
                <td className="w-14 text-[--black-2] font-light first:font-normal relative">
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
    </main>
  );
};

export default UsersTable;
