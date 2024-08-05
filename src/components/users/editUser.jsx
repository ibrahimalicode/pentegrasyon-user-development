import { useEffect, useState } from "react";
import { ArrowID, ArrowIU, CancelI, EditI } from "../../assets/icon";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelector";
import CustomTextarea from "../common/customTextarea";
import { usePopup } from "../../context/PopupContext";
import CustomCheckbox from "../common/customCheckbox";
import LoadingI from "../../assets/anim/loading";
import LoadingI2 from "../../assets/anim/spinner";
import { useDispatch, useSelector } from "react-redux";
import { getUser, resetgetUser } from "../../redux/users/getUserSlice";
import CustomPhoneInput from "../common/customPhoneInput";
import { formatEmail } from "../../utils/utils";
import { getCities } from "../../redux/data/getCitiesSlice";
import { getDistricts } from "../../redux/data/getDistrictsSlice";
import { getNeighs } from "../../redux/data/getNeighsSlice";
import {
  resetUpdateUser,
  updateUserData,
} from "../../redux/users/updateUserDataSlice";
import toast from "react-hot-toast";
import { updateUserInvoice } from "../../redux/users/updateUserInvoiceSlice";
import { updateUserPassword } from "../../redux/users/updateUserPasswordSlice";

const EditUser = ({ user, onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(<EditUserPopup user={user} onSuccess={onSuccess} />);
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
const EditUserPopup = ({ user: inData, onSuccess }) => {
  const dispatch = useDispatch();

  const { loading, success, error, data } = useSelector(
    (state) => state.users.updateUser
  );

  const {
    loading: invoiceLoading,
    success: invoiceSuccess,
    error: invoiceError,
  } = useSelector((state) => state.users.updateInvoice);

  const {
    loading: passwordLoading,
    success: passwordSuccess,
    error: passwordError,
  } = useSelector((state) => state.users.updatePassword);

  const {
    loading: getUserLoading,
    // success: getUserSuccess,
    error: getUserError,
    user,
  } = useSelector((state) => state.users.getUser);

  const { cities: citiesData, success: citiesSuccess } = useSelector(
    (state) => state.data.getCities
  );

  const { districts: districtsData, success: districtsSuccess } = useSelector(
    (state) => state.data.getDistricts
  );

  const { neighs: neighsData, success: neighsSuccess } = useSelector(
    (state) => state.data.getNeighs
  );

  const { setShowPopup, setPopupContent } = usePopup();

  const [districts1, setDistricts1] = useState([]);

  const [openFatura, setOpenFatura] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);

  const [userData, setUserData] = useState({
    userId: "",
    dealerId: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    city: null,
    district: null,
    checked: false,
  });

  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [userInvoice, setUserInvoice] = useState({
    userId: "",
    taxOffice: "",
    taxNumber: "",
    title: "",
    address: "",
    city: null,
    district: null,
    neighbourhood: "",
    tradeRegistryNumber: "",
    mersisNumber: "",
  });

  const closeForm = () => {
    setUserInvoice(null);
    setUserData(null);
    setPopupContent(null);
    setShowPopup(false);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    if (userPassword.confirmPassword || userPassword.password) {
      if (userPassword.confirmPassword !== userPassword.password) {
        toast.error("Şifreler eşit değil");
        return;
      }
    }
    dispatch(updateUserData({ ...userData }));
    if (openFatura) {
      dispatch(updateUserInvoice({ ...userInvoice }));
    }
    if (openPassword) {
      dispatch(
        updateUserPassword({
          targetUserId: inData.id,
          newPassword: userPassword.password,
          newPasswordConfirm: userPassword.confirmPassword,
        })
      );
    }
  };

  //UPDATE USER DATA
  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.loading("Updating...");
    } else if (error) {
      toast.dismiss();
      if (error?.message_TR) {
        toast.error(error.message_TR);
      } else {
        toast.error("Something went wrong");
      }
      dispatch(resetUpdateUser());
    } else if (success) {
      closeForm();
      onSuccess();
      toast.dismiss();
      toast.success("Successfuly updated");
      dispatch(resetUpdateUser());
    }
  }, [loading, success, error, dispatch]);

  // GET AND SET USER IF THERE IS NOT
  useEffect(() => {
    if (!user) {
      dispatch(getUser({ userId: inData.id }));
    } else {
      setUserData({
        userId: inData.id,
        dealerId: user.dealerId,
        email: user.email,
        phoneNumber: "9" + user.phoneNumber,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        city: {
          value: user.city,
          label: user.city,
          id: null,
        },
        district: { value: user.district, label: user.district, id: null },
        checked: false,
      });
      if (user.userInvoiceAddressDTO) {
        const userInv = user.userInvoiceAddressDTO;
        setUserInvoice({
          userId: inData.id,
          taxOffice: userInv.taxOffice,
          taxNumber: userInv.taxNumber,
          title: userInv.title,
          address: userInv.address,
          city: { value: userInv.city, label: userInv.city, id: null },
          district: {
            value: userInv.district,
            label: userInv.district,
            id: null,
          },
          neighbourhood: userInv.neighbourhood,
          tradeRegistryNumber: userInv.tradeRegistryNumber,
          mersisNumber: userInv.mersisNumber,
        });
      }
    }

    return () => {
      if (user) {
        dispatch(resetgetUser());
        console.log("out");
      }
    };
  }, [user]);

  // GET AND SET CITIES IF THERE IS NO CITIES
  useEffect(() => {
    if (!citiesData) {
      dispatch(getCities());
    }
    if (citiesSuccess) {
      setCities(citiesData);
    }
  }, [citiesData, citiesSuccess]);

  // GET DISTRICTS WHENEVER USER'S CITY CHANGES
  useEffect(() => {
    if (userData.city?.id) {
      dispatch(getDistricts({ cityId: userData.city.id }));
      setUserData((prev) => {
        return {
          ...prev,
          district: null,
        };
      });
    } else if (userData.city?.label) {
      if (cities.length > 0) {
        const cityId = cities.filter(
          (city) =>
            city.label.toLowerCase() === userData.city.label.toLowerCase()
        )[0]?.id;
        if (cityId) {
          dispatch(getDistricts({ cityId: cityId }));
        }
      }
    }
  }, [userData.city]);

  // GET DISTRICTS WHENEVER INVOICE'S CITY CHANGES
  useEffect(() => {
    if (userInvoice.city?.id) {
      dispatch(getDistricts({ cityId: userInvoice.city.id }));
      setUserInvoice((prev) => {
        return {
          ...prev,
          district: null,
        };
      });
    } else if (userInvoice.city?.label) {
      if (cities.length > 0) {
        const cityId = cities.filter(
          (city) =>
            city.label.toLowerCase() === userInvoice.city.label.toLowerCase()
        )[0]?.id;
        if (cityId) {
          dispatch(getDistricts({ cityId: cityId }));
          setUserInvoice((prev) => {
            return {
              ...prev,
              district: null,
            };
          });
        }
      }
    }
  }, [userInvoice.city]);

  // SET DISTRICTS ACCORDING TO USER OR INVOICE
  useEffect(() => {
    if (districtsSuccess) {
      if (!userData.district || !userData.district?.id) {
        const district = districtsData.filter(
          (dist) =>
            dist?.label.toLowerCase() === userData.district?.label.toLowerCase()
        )[0];
        if (district) {
          setUserData((prev) => {
            return {
              ...prev,
              district,
            };
          });
        }
        setDistricts1(districtsData);
      } else {
        setDistricts(districtsData);
      }
    }
  }, [districtsSuccess]);

  // GET NEIGHBOURHOODS WHENEVER THE INVOICE DISTRICT CHANGES
  useEffect(() => {
    if (userInvoice.district?.id && userInvoice.city?.id) {
      dispatch(
        getNeighs({
          cityId: userInvoice.city.id,
          districtId: userInvoice.district.id,
        })
      );
      setUserInvoice((prev) => {
        return {
          ...prev,
          neighbourhood: null,
        };
      });
    } else if (userInvoice.district?.label && userInvoice.city?.label) {
      if (cities.length > 0 && districts.length > 0) {
        const cityLabel = (userInvoice.city?.label).toLowerCase();
        const districtLabel = (userInvoice.district?.label).toLowerCase();

        const cityId = cities.filter(
          (city) => city.label.toLowerCase() === cityLabel
        )[0]?.id;

        const districtId = districts.filter(
          (district) => district.label.toLowerCase() === districtLabel
        )[0]?.id;
        if (cityId && districtId) {
          dispatch(getNeighs({ cityId, districtId }));
          setUserInvoice((prev) => {
            return {
              ...prev,
              neighbourhood: null,
            };
          });
        }
      }
    }
  }, [userInvoice.district]);

  useEffect(() => {
    if (neighsSuccess) {
      setNeighs(neighsData);
    }
  }, [neighsSuccess]);

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[90dvh] overflow-y-scroll relative">
      {(getUserLoading || getUserError || loading) && (
        <div className="flex justify-center items-center absolute top-24 bottom-0 left-0 right-0 bg-slate-950/[.01]  z-10">
          <div className="pb-72">
            <LoadingI2 className="rounded-full scale-150" />
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
            <>
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
                <CustomPhoneInput
                  required={true}
                  label="Telefone"
                  placeholder="Telefone"
                  className="py-[.45rem] text-sm"
                  value={userData.phoneNumber}
                  onChange={(phone) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        phoneNumber: phone,
                      };
                    });
                  }}
                  maxLength={14}
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
                        email: formatEmail(e.target.value),
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
                      ? userData.city
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
                    userData.district
                      ? userData.district
                      : { value: null, label: "İlçe seç" }
                  }
                  options={[{ value: null, label: "İlçe seç" }, ...districts1]}
                  onChange={(selectedOption) => {
                    setUserData((prev) => {
                      return {
                        ...prev,
                        district: selectedOption,
                      };
                    });
                  }}
                />
              </div>

              <div className="w-full flex justify-between mt-8">
                <CustomCheckbox
                  label="Kayıt Bilgilendirmesi gönder"
                  className="scale-95 font-[350]"
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
            </>

            <>
              <div
                className="w-full flex border-b border-solid border-[--border-1] cursor-pointer mt-14"
                onClick={() => setOpenPassword(!openPassword)}
              >
                <h1 className="w-full text-center text-lg font-normal text-[--black-3] ">
                  Şifre Değiştir
                </h1>
                <span>
                  {openPassword ? (
                    <ArrowIU className="size-5" />
                  ) : (
                    <ArrowID className="size-5" />
                  )}
                </span>
              </div>
              {openPassword && (
                <div className="flex gap-4">
                  <CustomInput
                    required={userPassword.confirmPassword ? true : false}
                    label="Şifre"
                    placeholder="Şifre"
                    className="py-[.45rem] text-sm"
                    letIcon={true}
                    value={userPassword.password}
                    onChange={(e) => {
                      setUserPassword((prev) => {
                        return {
                          ...prev,
                          password: e.target.value,
                        };
                      });
                    }}
                  />
                  <CustomInput
                    required={userPassword.password ? true : false}
                    label="Şifreyi onayla"
                    placeholder="Şifre"
                    className="py-[.45rem] text-sm"
                    letIcon={true}
                    value={userPassword.confirmPassword}
                    onChange={(e) => {
                      setUserPassword((prev) => {
                        return {
                          ...prev,
                          confirmPassword: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
              )}
            </>

            <div
              className="w-full flex border-b border-solid border-[--border-1] cursor-pointer mt-14"
              onClick={() => setOpenFatura(!openFatura)}
            >
              <h1 className="w-full text-center text-lg font-normal text-[--black-3]">
                Fatura Adresi
              </h1>
              <span>
                {openFatura ? (
                  <ArrowIU className="size-5" />
                ) : (
                  <ArrowID className="size-5" />
                )}
              </span>
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
                      userInvoice.city
                        ? userInvoice.city
                        : { value: null, label: "Şehir seç" }
                    }
                    options={[{ value: null, label: "Şehir seç" }, ...cities]}
                    onChange={(selectedOption) => {
                      setUserInvoice((prev) => {
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
                        ? userInvoice.district
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
                        ? userInvoice.neighbourhood
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
                disabled={loading}
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
