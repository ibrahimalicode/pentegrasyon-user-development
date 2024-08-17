import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
// COMPONENTS
import CustomSelect from "../../common/customSelector";
import CustomTag from "../../common/customTag";
import Button from "../../common/button";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { resetGetUsersState } from "../../../redux/users/getUsersSlice";
import { formatSelectorData } from "../../../utils/utils";
import CloseI from "../../../assets/icon/close";

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
      const unselectedUsers = usersData.filter(
        (user) => user.id !== selectedOption.id
      );
      setUsersData([...selectedUsers, ...unselectedUsers]);
      setSelectedUsers([allUsersOption]);
    } else {
      setSelectedUsers((prev) => {
        return [...prev, selectedOption];
      });
      const unselectedUsers = usersData.filter(
        (user) => user.id !== selectedOption.id
      );
      setUsersData(unselectedUsers);
    }
  }

  function unselectUser(user) {
    const users = selectedUsers.filter((selected) => selected.id !== user.id);
    setSelectedUsers(users);
    if (!usersData.some((prev) => prev.id === user.id)) {
      if (user.id === 1) {
        setUsersData((prev) => {
          return [user, ...prev];
        });
      } else {
        setUsersData((prev) => {
          return [...prev, user];
        });
      }
    }
  }

  function clearFilter() {
    setUsersData((prev) => {
      return [...prev, ...selectedUsers];
    });
    setSelectedUsers([]);
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
        <div className="w-full flex justify-between pr-[10%]">
          <div className="w-full max-w-48">
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
          <Button
            text="Temizle"
            icon={<CloseI className="size-[15px]" />}
            className={`border-[var(--primary-1)] text-[var(--primary-1)] text-xs h-max py-[.4rem] self-end gap-1 ${
              selectedUsers.length > 1 ? "visible" : "invisible"
            }`}
            onClick={clearFilter}
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
