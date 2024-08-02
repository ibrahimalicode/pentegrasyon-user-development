import { useState } from "react";
import { ArrowID, ArrowIU, EditI } from "../../assets/icon";
import { formatPhoneNumber } from "../../utils/utils";
import CustomInput from "../common/CustomInput";
import CustomSelect from "../common/CustomSelector";
import CustomTextarea from "../common/customTextarea";

const EditUser = ({ user }) => {
  const handleClick = () => {};
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

const EditUserPopup = () => {
  const { showPopup, setShowPopup, setPopupContent } = usePopup();

  const [dealers, setDealers] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighs, setNeighs] = useState([]);

  const [usersData, setUsersData] = useState({
    dealerId: "",
    email: "",
    phoneNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    password: "",
    password2: "",
    checked: false,
  });

  const [usersInvoice, setUsersInvoice] = useState({
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

  const clearForm = () => {
    setPopupContent(null);
    setShowPopup(false);
    setDealers([]);
  };

  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[90dvh] overflow-y-scroll">
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer"
            onClick={clearForm}
          >
            <CancelI />
          </div>
        </div>
        <h1 className="self-center text-2xl font-bold">Kullanıcı Ekle</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleAddUser} ref={formRef}>
            <div className="flex gap-4">
              <CustomInput
                required={true}
                label="Ad"
                placeholder="Ad"
                className="py-[.45rem]"
                value={usersData.firstName}
                onChange={(e) => {
                  setUsersData((prev) => {
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
                className="py-[.45rem]"
                value={usersData.lastName}
                onChange={(e) => {
                  setUsersData((prev) => {
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
                className="py-[.45rem]"
                value={usersData.phoneNumber}
                onChange={(e) => {
                  setUsersData((prev) => {
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
                className="py-[.45rem]"
                value={usersData.email}
                onChange={(e) => {
                  setUsersData((prev) => {
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
                  usersData.city
                    ? { value: usersData.city, label: usersData.city }
                    : { value: null, label: "Şehir seç" }
                }
                options={[{ value: null, label: "Şehir seç" }, ...cities]}
                onChange={(selectedOption) => {
                  setUsersData((prev) => {
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
                className="py-[.45rem]"
                value={usersData.address}
                onChange={(e) => {
                  setUsersData((prev) => {
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
                required={true}
                label="Şifre"
                placeholder="Şifre"
                className="py-[.45rem]"
                letIcon={true}
                value={usersData.password}
                onChange={(e) => {
                  setUsersData((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  });
                }}
              />
              <CustomInput
                required={true}
                label="Şifreyi onayla"
                placeholder="Şifre"
                className="py-[.45rem]"
                letIcon={true}
                value={usersData.password2}
                onChange={(e) => {
                  setUsersData((prev) => {
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
                checked={usersData.checked}
                onChange={() => {
                  setUsersData((prev) => {
                    return {
                      ...prev,
                      checked: !usersData.checked,
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
                    value={usersInvoice.title}
                    onChange={(e) => {
                      setUsersInvoice((prev) => {
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
                    value={usersInvoice.tradeRegistryNumber}
                    onChange={(e) => {
                      setUsersInvoice((prev) => {
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
                    value={usersInvoice.taxOffice}
                    onChange={(e) => {
                      setUsersInvoice((prev) => {
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
                    value={usersInvoice.taxNumber}
                    onChange={(e) => {
                      setUsersInvoice((prev) => {
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
                    value={usersInvoice.mersisNumber}
                    onChange={(e) => {
                      setUsersInvoice((prev) => {
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
                      usersData.city
                        ? { value: usersData.city, label: usersData.city }
                        : { value: null, label: "Şehir seç" }
                    }
                    options={[{ value: null, label: "Şehir seç" }, ...cities]}
                    onChange={(selectedOption) => {
                      setUsersData((prev) => {
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
                      usersInvoice.district
                        ? {
                            value: usersInvoice.district,
                            label: usersInvoice.district,
                          }
                        : { value: null, label: "İlçe seç" }
                    }
                    options={[{ value: null, label: "İlçe seç" }, ...districts]}
                    onChange={(selectedOption) => {
                      setUsersInvoice((prev) => {
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
                      usersInvoice.neighbourhood
                        ? {
                            value: usersInvoice.neighbourhood,
                            label: usersInvoice.neighbourhood,
                          }
                        : { value: null, label: "Mahalle Seç" }
                    }
                    options={[{ value: null, label: "Mahalle Seç" }, ...neighs]}
                    onChange={(selectedOption) => {
                      setUsersInvoice((prev) => {
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
                    value={usersInvoice.address}
                    onChange={(e) => {
                      setUsersInvoice((prev) => {
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
