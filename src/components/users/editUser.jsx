import { useEffect, useState } from "react";
import { ArrowID, ArrowIU, CancelI, EditI } from "../../assets/icon";
import { formatPhoneNumber, spacePhoneNumber } from "../../utils/utils";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelector";
import CustomTextarea from "../common/customTextarea";
import { usePopup } from "../../context/PopupContext";
import CustomCheckbox from "../common/customCheckbox";
import LoadingI from "../../assets/anim/loading";
import LoadingI2 from "../../assets/anim/spinner";
import { useDispatch, useSelector } from "react-redux";
import { getUser, resetgetUserState } from "../../redux/users/getUserSlice";

const EditUser = ({ user }) => {
  const { setShowPopup, setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(<EditUserPopup user={user} />);
    setShowPopup(true);
  };
  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left border-b border-solid border-[--border-1] cursor-pointer"
      onClick={handleClick}
    >
      <EditI className="w-5" strokeWidth="1.8" /> Düzenle
    </button>
  );
};

export default EditUser;

////******POPUP COMPONENT*******////
const EditUserPopup = ({ user: data }) => {
  const dispatch = useDispatch();

  const { loading, success, error, user } = useSelector(
    (state) => state.users.getUser
  );
  const { setShowPopup, setPopupContent } = usePopup();

  const [openFatura, setOpenFatura] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);

  const [userData, setUserData] = useState({
    dealerId: "",
    email: "",
    phoneNumber: "0",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    password: "",
    password2: "",
    checked: false,
  });

  const [userInvoice, setUserInvoice] = useState({
    taxOffice: "",
    taxNumber: "",
    title: "",
    address: "",
    city: "",
    district: "",
    neighbourhood: "",
    tradeRegistryNumber: "",
    mersisNumber: "",
  });

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
    setUserData(null);
    setUserInvoice(null);
    setDealers([]);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    console.log("edit user");
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUser({ userId: data.id }));
    } else {
      setUserData({
        dealerId: user.dealerId,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        address: user.address,
        password: "",
        password2: "",
        checked: false,
      });
      if (user.userInvoiceAddressDTO) {
        const userInv = user.userInvoiceAddressDTO;
        setUserInvoice({
          taxOffice: userInv.taxOffice,
          taxNumber: userInv.taxNumber,
          title: userInv.title,
          address: userInv.address,
          city: userInv.city,
          district: userInv.district,
          neighbourhood: userInv.neighbourhood,
          tradeRegistryNumber: userInv.tradeRegistryNumber,
          mersisNumber: userInv.mersisNumber,
        });
      }
    }

    return () => {
      if (user) {
        dispatch(resetgetUserState());
      }
    };
  }, [user]);

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[90dvh] overflow-y-scroll relative">
      {(loading || error) && (
        <div className="flex justify-center items-center absolute top-24 bottom-0 left-0 right-0 bg-slate-950/5  z-10">
          <div className="pb-72">
            <LoadingI2 className="bg-slate-200 rounded-full scale-150" />
          </div>
        </div>
      )}
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer "
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>
        <h1 className="self-center text-2xl font-bold">Kullanıcı Düzenle</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleEditUser}>
            <div className="flex gap-4">
              <CustomInput
                required={true}
                label="Ad"
                placeholder="Ad"
                className="py-[.45rem] text-sm"
                value={userData.firstName}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      firstName: e.target.value,
                    };
                  });
                }}
              />
              <CustomInput
                required={true}
                label="Soyad"
                placeholder="Soyad"
                className="py-[.45rem] text-sm"
                value={userData.lastName}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      lastName: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div className="flex gap-4">
              <CustomInput
                required={true}
                label="Telefone"
                placeholder="Telefone"
                className="py-[.45rem] text-sm"
                value={spacePhoneNumber(userData.phoneNumber)}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      phoneNumber: formatPhoneNumber(e),
                    };
                  });
                }}
                maxLength={11}
              />
              <CustomInput
                required={true}
                label="E-Posta"
                placeholder="E-Posta"
                className="py-[.45rem] text-sm"
                value={userData.email}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className="flex gap-4">
              <CustomSelect
                required={true}
                label="Şehir"
                placeholder="Ad"
                style={{ padding: "1px 0px" }}
                className="text-sm"
                value={
                  userData.city
                    ? { value: userData.city, label: userData.city }
                    : { value: null, label: "Şehir seç" }
                }
                options={[{ value: null, label: "Şehir seç" }, ...cities]}
                onChange={(selectedOption) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      city: selectedOption,
                    };
                  });
                }}
              />
              <CustomInput
                required={true}
                label="Adres"
                placeholder="Adres"
                className="py-[.45rem] text-sm"
                value={userData.address}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      address: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className="flex gap-4">
              <CustomInput
                required={false}
                label="Şifre"
                placeholder="Şifre"
                className="py-[.45rem] text-sm"
                letIcon={true}
                value={userData.password}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  });
                }}
              />
              <CustomInput
                required={false}
                label="Şifreyi onayla"
                placeholder="Şifre"
                className="py-[.45rem] text-sm"
                letIcon={true}
                value={userData.password2}
                onChange={(e) => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      password2: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className="w-full flex justify-between mt-8">
              <CustomCheckbox
                label="Kayıt Bilgilendirmesi gönder"
                checked={userData.checked}
                onChange={() => {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      checked: !userData.checked,
                    };
                  });
                }}
              />
              {/*  <button className="w-max px-2 py-2 bg-[--primary-2] text-[--white-1] text-sm rounded-md">
                Kaydet
              </button> */}
            </div>

            <div
              className="w-full flex border-b border-solid border-[--border-1] cursor-pointer mt-14"
              onClick={() => setOpenFatura(!openFatura)}
            >
              <h1 className="w-full text-center text-xl font-bold ">
                Fatura Adresi
              </h1>
              <span>{openFatura ? <ArrowIU /> : <ArrowID />}</span>
            </div>
            {openFatura && (
              <>
                <div className="flex gap-4">
                  <CustomInput
                    required={true}
                    label="Resmi Ünvan"
                    placeholder="Resmi Ünvan"
                    className="py-[.45rem] text-sm"
                    value={userInvoice.title}
                    onChange={(e) => {
                      setUserInvoice((prev) => {
                        return {
                          ...prev,
                          title: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  <CustomInput
                    required={true}
                    label="VKN veya TCKN"
                    placeholder="VKN veya TCKN"
                    className="py-[.45rem] text-sm"
                    value={userInvoice.tradeRegistryNumber}
                    onChange={(e) => {
                      setUserInvoice((prev) => {
                        return {
                          ...prev,
                          tradeRegistryNumber: e.target.value,
                        };
                      });
                    }}
                  />
                  <CustomInput
                    required={true}
                    label="Vergi Dairesi"
                    placeholder="Vergi Dairesi"
                    className="py-[.45rem] text-sm"
                    value={userInvoice.taxOffice}
                    onChange={(e) => {
                      setUserInvoice((prev) => {
                        return {
                          ...prev,
                          taxOffice: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  <CustomInput
                    required={true}
                    label="VTic.Sic.No"
                    placeholder="VTic.Sic.No"
                    className="py-[.45rem] text-sm"
                    value={userInvoice.taxNumber}
                    onChange={(e) => {
                      setUserInvoice((prev) => {
                        return {
                          ...prev,
                          taxNumber: e.target.value,
                        };
                      });
                    }}
                  />
                  <CustomInput
                    required={true}
                    label="Mersis No"
                    placeholder="Mersis No"
                    className="py-[.45rem] text-sm"
                    value={userInvoice.mersisNumber}
                    onChange={(e) => {
                      setUserInvoice((prev) => {
                        return {
                          ...prev,
                          mersisNumber: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  <CustomSelect
                    required={true}
                    label="Şehir"
                    placeholder="Ad"
                    style={{ padding: "1px 0px" }}
                    className="text-sm"
                    value={
                      userData.city
                        ? { value: userData.city, label: userData.city }
                        : { value: null, label: "Şehir seç" }
                    }
                    options={[{ value: null, label: "Şehir seç" }, ...cities]}
                    onChange={(selectedOption) => {
                      setUserData((prev) => {
                        return {
                          ...prev,
                          city: selectedOption,
                        };
                      });
                    }}
                  />
                  <CustomSelect
                    required={true}
                    label="İlçe"
                    placeholder="Ad"
                    style={{ padding: "1px 0px" }}
                    className="text-sm"
                    value={
                      userInvoice.district
                        ? {
                            value: userInvoice.district,
                            label: userInvoice.district,
                          }
                        : { value: null, label: "İlçe seç" }
                    }
                    options={[{ value: null, label: "İlçe seç" }, ...districts]}
                    onChange={(selectedOption) => {
                      setUserInvoice((prev) => {
                        return {
                          ...prev,
                          district: selectedOption,
                        };
                      });
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  <CustomSelect
                    required={true}
                    label="Mahalle"
                    placeholder="Ad"
                    style={{ padding: "1px 0px" }}
                    className="text-sm"
                    value={
                      userInvoice.neighbourhood
                        ? {
                            value: userInvoice.neighbourhood,
                            label: userInvoice.neighbourhood,
                          }
                        : { value: null, label: "Mahalle Seç" }
                    }
                    options={[{ value: null, label: "Mahalle Seç" }, ...neighs]}
                    onChange={(selectedOption) => {
                      setUserInvoice((prev) => {
                        return {
                          ...prev,
                          neighbourhood: selectedOption,
                        };
                      });
                    }}
                  />
                  <CustomTextarea
                    required={true}
                    label="Adres"
                    placeholder="Adres"
                    className="pb-14 text-sm"
                    value={userInvoice.address}
                    onChange={(e) => {
                      setUserInvoice((prev) => {
                        return {
                          ...prev,
                          address: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
              </>
            )}
            <div className="w-full flex justify-end mt-10">
              <button
                className="py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-lg"
                type="submit"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
