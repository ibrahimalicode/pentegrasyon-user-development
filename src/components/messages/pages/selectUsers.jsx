import React, { useEffect, useRef, useState } from "react";
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  resetGetUsersState,
} from "../../../redux/users/getUsersSlice";
import CustomSelect from "../../common/customSelector";
import { formatSelectorData } from "../../../utils/utils";
import CustomTag from "../../common/customTag";
import toast from "react-hot-toast";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const dispatch = useDispatch();
  const toastId = useRef();

  const { loading, success, error, users } = useSelector(
    (state) => state.users.getUsers
  );

  const allUsersOption = { label: "Bütün Kullanıcı", value: true, id: 1 };
  const [usersData, setUsersData] = useState([]);

  function handleSelectUser(selectedOption) {
    if (selectedOption.id === 1) {
      setSelectedUsers([selectedOption]);
    } else {
      setSelectedUsers((prev) => {
        return [...prev, selectedOption];
      });
    }
    const unselectedUsers = usersData.filter(
      (user) => user.id !== selectedOption.id
    );
    setUsersData(unselectedUsers);
  }

  function unselectUser(user) {
    const users = selectedUsers.filter((selected) => selected.id !== user.id);
    setSelectedUsers(users);
    setUsersData((prev) => {
      return [user, ...prev];
    });
  }

  // TOAST AND SET USERS
  useEffect(() => {
    if (error) {
      toast.dismiss(toastId.current);
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetGetUsersState());
    }
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }

    if (success) {
      toast.dismiss(toastId.current);
      toast.success("Kullanıcı araması başarıyla tamamlandı!");
      const formattedUsers = formatSelectorData(users?.data);
      setUsersData([allUsersOption, ...formattedUsers]);
      dispatch(resetGetUsersState());
    }
  }, [loading, success, error, users]);

  return (
    <div className="w-full">
      <div>
        <div className="max-w-48">
          <CustomSelect
            value={{
              label: `${
                usersData.length > 0 ? "Kullanıcı Seç" : "Kullanıcı ara"
              }`,
              value: null,
              id: null,
            }}
            options={usersData.length > 0 ? usersData : [allUsersOption]}
            onChange={(selectedOption) => handleSelectUser(selectedOption)}
            className="mt-[0] sm:mt-[0]"
            className2="mt-[0] sm:mt-[0]"
            disabled={selectedUsers[0]?.id === 1}
          />
        </div>
        <div className="w-[90%] h-[1px] bg-[--border-1] mt-2"></div>
        <div className="w-full pt-4 flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {selectedUsers.length > 0 &&
            selectedUsers.map((user) => (
              <React.Fragment key={user.id}>
                <CustomTag onClick={() => unselectUser(user)} data={user} />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SelectUsers;
