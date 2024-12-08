//MODULES
import { isEqual } from "lodash";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { LockI } from "../../../assets/icon";
import CustomInput from "../../common/customInput";
import CustomToggle from "../../common/customToggle";
import sidebarItems from "../../../enums/sidebarItems";
import CustomCheckbox from "../../common/customCheckbox";
import ConfirmationPopup from "../components/confirmationPopup";

//UTILS
import { usePopup } from "../../../context/PopupContext";
import { useProtectPages } from "../../../context/ProtectPagesContext";

//REDUX
import {
  resetupdateUserLock,
  updateUserLock,
} from "../../../redux/user/updateUserLockSlice";
import AuthorizePopup from "../components/authorizePopup";

const ProtectPage = () => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();
  const {
    protectedPages,
    setProtectedPages,
    protectedPagesBefore,
    setProtectedPagesBefore,
  } = useProtectPages();

  const { user } = useSelector((state) => state.user.getUser);
  const { error, loading, success } = useSelector(
    (state) => state.user.updateUserLock
  );

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLockedData, setIsLockedData] = useState(protectedPages);

  function handleSubmit() {
    if (isEqual(protectedPagesBefore, isLockedData)) {
      toast.error("Hiç bir değişiklik yapmadınız.", { id: "safePages" });
      return;
    }
    if (protectedPages.password.length < 4) {
      toast.error("Şifreniz en az 4 karakter olmalı.", { id: "safePages" });
      return;
    }
    if (protectedPagesBefore.password == protectedPages.password) {
      dispatch(updateUserLock(protectedPages));
    } else {
      setPopupContent(<ConfirmationPopup user={user} />);
    }
  }

  //AUTH
  useEffect(() => {
    if (!isAuthorized) {
      setPopupContent(<AuthorizePopup setIsAuthorized={setIsAuthorized} />);
    }
  }, [isAuthorized]);

  //UPDATE
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...", { id: "safePages" });
    } else if (error) {
      setPopupContent(null);
      dispatch(resetupdateUserLock());
    } else if (success) {
      setPopupContent(null);
      toast.dismiss(toastId.current);
      toast.success("Başarıyla Güncelendi", { id: "safePages" });
      setProtectedPages(isLockedData);
      setProtectedPagesBefore(isLockedData);
      dispatch(resetupdateUserLock());
    }
  }, [loading, error, success]);

  return (
    isAuthorized && (
      <section className="lg:ml-[280px] pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
        {/* TITLE */}
        <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
          <h2>Yetki Korunması</h2>
        </div>

        <main className="pb-10">
          <div className="border my-3 p-3 rounded-md">
            <div className="flex gap-16 flex-wrap">
              <div className="flex items-center gap-4">
                <h1 className="text-xl">Yetki Koruması</h1>
                <CustomToggle
                  className="scale-[.8] peer-checked:bg-[--green-1]"
                  checked={isLockedData?.lock || false}
                  onChange={() => {
                    setIsLockedData((prev) => {
                      return {
                        ...prev,
                        lock: !isLockedData?.lock,
                      };
                    });
                    dispatch(
                      updateUserLock({
                        ...protectedPages,
                        lock: !isLockedData?.lock,
                      })
                    );
                  }}
                />
              </div>

              <div className="flex items-center gap-4">
                <h1 className="whitespace-nowrap text-xl">Koruma Parolası</h1>
                <CustomInput
                  className="mt-[0] sm:mt-[0]"
                  className2="max-w-28 mt-[0] sm:mt-[0]"
                  value={isLockedData?.password || ""}
                  onChange={(e) =>
                    setIsLockedData((prev) => {
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
                Bu ayan açtiginizda yetkisiz personelin menülere erisimini
                parola ile koruyabilirsiniz. Hangi sekmelerin korunacagini
                seçiniz.
              </p>
            </div>
          </div>
          {isLockedData && isLockedData?.lock && (
            <>
              <div className="flex flex-col gap-2 p-4">
                {[
                  ...sidebarItems.filter((i) => i.show),
                  {
                    text: "Profil",
                    id: "profile",
                  },
                ].map((item) => (
                  <div key={item.to}>
                    <CustomCheckbox
                      label={item.text}
                      checked={isLockedData[item.id]}
                      Icon={
                        <LockI className="text-[--white-1]" strokeWidth={2.5} />
                      }
                      onChange={() =>
                        setIsLockedData((prev) => {
                          return {
                            ...prev,
                            [item.id]: !isLockedData[item.id],
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
      </section>
    )
  );
};

export default ProtectPage;
