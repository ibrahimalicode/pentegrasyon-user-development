import sidebarItems from "../../../enums/sidebarItems";
import CustomInput from "../../common/customInput";
import CustomToggle from "../../common/customToggle";
import CustomCheckbox from "../../common/customCheckbox";
import { useEffect, useRef, useState } from "react";
import { LockI } from "../../../assets/icon";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLock,
  resetgetUserLock,
} from "../../../redux/user/getUserLockSlice";
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import {
  resetupdateUserLock,
  updateUserLock,
} from "../../../redux/user/updateUserLockSlice";

const ProtectPages = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { error, data } = useSelector((state) => state.user.getUserLock);
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = useSelector((state) => state.user.updateUserLock);
  const [lockDataBefore, setLockDataBefore] = useState(null);
  const [lockData, setLockData] = useState(null);
  // {
  //   lock: true,
  //   password: "string",
  //   dashboard: true,
  //   restaurants: true,
  //   couriers: true,
  //   licenses: true,
  //   tickets: true,
  //   logs: true,
  //   payments: true,
  //   profile: true,
  //   ticketTotalPrice: true,
  // }

  function handleSubmit() {
    if (isEqual(lockDataBefore, lockData)) {
      toast.error("Hiç bir değişiklik yapmadınız.");
      return;
    }
    dispatch(updateUserLock(lockData));
  }

  //GET
  useEffect(() => {
    if (!lockData) {
      dispatch(getUserLock());
    }
  }, [lockData]);

  //SET
  useEffect(() => {
    if (error) {
      dispatch(resetgetUserLock());
    } else if (data) {
      console.log(data);
      setLockData(data);
      setLockDataBefore(data);
      dispatch(resetgetUserLock());
    }
  }, [data, error]);

  //UPDATE
  useEffect(() => {
    if (updateLoading) {
      toastId.current = toast.loading("İşleniyor...");
    } else if (updateError) {
      dispatch(resetupdateUserLock());
    } else if (updateSuccess) {
      toast.dismiss(toastId.current);
      toast.success("Başarıyla Güncelendi");
    }
  }, [updateLoading, updateError, updateSuccess]);

  return (
    <main className="pb-10">
      <div className="border my-3 p-3 rounded-md">
        <div className="flex gap-16 flex-wrap">
          <div className="flex items-center gap-4">
            <h1 className="text-xl">Yetki Koruması</h1>
            <CustomToggle
              checked={lockData?.lock || false}
              onChange={() =>
                setLockData((prev) => {
                  return {
                    ...prev,
                    lock: !lockData?.lock,
                  };
                })
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <h1 className="whitespace-nowrap text-xl">Koruma Parolası</h1>
            <CustomInput
              className="mt-[0] sm:mt-[0]"
              className2="max-w-28 mt-[0] sm:mt-[0]"
              value={lockData?.password || ""}
              onChange={(e) =>
                setLockData((prev) => {
                  return {
                    ...prev,
                    password: e,
                  };
                })
              }
            />
          </div>
        </div>

        <div>
          <p className="text-sm max mt-4">
            Bu ayan açtiginizda yetkisiz personelin menülere erisimini parola
            ile koruyabilirsiniz. Hangi sekmelerin korunacagini seçiniz.
          </p>
        </div>
      </div>
      {lockData && lockData?.lock && (
        <>
          <div className="flex flex-col gap-2 p-4">
            {sidebarItems.map((item) => (
              <div key={item.to}>
                <CustomCheckbox
                  label={item.text}
                  checked={lockData[item.id]}
                  Icon={
                    <LockI className="text-[--white-1]" strokeWidth={2.5} />
                  }
                  onChange={() =>
                    setLockData((prev) => {
                      return {
                        ...prev,
                        [item.id]: !lockData[item.id],
                      };
                    })
                  }
                  className2="text-[var(--black-1)]"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="text-[--white-1] bg-[--primary-1] rounded-md px-5 py-2.5"
            >
              Kaydet
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default ProtectPages;
