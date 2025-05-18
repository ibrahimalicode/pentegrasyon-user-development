//MODULES
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { CancelI } from "../../../../assets/icon";
import CustomInput from "../../../common/customInput";
import CustomToast from "../../../common/customToast";
import CustomCheckbox from "../../../common/customCheckbox";
import { usePopup } from "../../../../context/PopupContext";
import licenseTypeIds from "../../../../enums/licenseTypeIds";

//REDUX
import {
  addIntegrationInformation,
  resetAddIntegrationInformation,
} from "../../../../redux/informations/yemekSepeti/addIntegrationInformationSlice";
import {
  getIntegrationInformationByLicenseId,
  resetGetIntegrationInformationByLicenseId,
} from "../../../../redux/informations/yemekSepeti/getIntegrationInformationByLicenseIdSlice";
import {
  resetUpdateIntegrationInformation,
  updateIntegrationInformation,
} from "../../../../redux/informations/yemekSepeti/updateIntegrationInformationSlice";

const YemekSepetiLicenseSettings = ({ data, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { user } = useSelector((state) => state.user.getUser);
  const { loading, success, error } = useSelector(
    (state) => state.integrationInfos.yemekSepeti.addIntegrationInfo
  );

  const {
    loading: updateLoad,
    success: updateSucc,
    error: updateErr,
  } = useSelector(
    (state) => state.integrationInfos.yemekSepeti.updateIntegrationInfo
  );

  const {
    loading: getLoading,
    error: getError,
    infoData,
  } = useSelector(
    (state) => state.integrationInfos.yemekSepeti.getIntegrationInfo
  );

  const initialData = {
    licenseId: data.id,
    restaurantId: data.restaurantId,
    sellerId: "",
    remoteId: "",
    chainCode: "",
    commissionRate: 0,
    sendYemekSepetiEmailNotify: true,
    useExternalCourierService: true,
  };

  const [licenseData, setLicenseData] = useState(initialData);
  const [licenseDataBefore, setLicenseDataBefore] = useState(initialData);

  const closeForm = () => {
    toast.remove("LICENSE_ENTEGRATION_COMFIRMATION");
    setPopupContent(null);
  };

  function confirmAndContinue() {
    toast.dismiss();
    const confirmation = (t) => {
      return (
        <div className="max-w-lg w-full bg-[--white-1] text-[--black-2] shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 border border-[--brown-1] overflow-clip p-4 font-normal">
          <div>
            <p className="text-center font-bold mb-2">ÖNEMLİ BİLGİLENDİRME !</p>
            <p>
              Entegrasyon geçişi için Yemeksepeti&apos;ne mail gönderilecek.
              Yemeksepeti tarafından Entegrasyon geçişleri sadece{" "}
              <span className="font-bold">Salı</span>,{" "}
              <span className="font-bold">Çarşamba</span>
              ve <span className="font-bold">Perşembe</span> günleri olarak
              belirlenmiştir.. Entegrasyon geçişi yapıldığında{" "}
              <span className="font-bold">Chain Code</span> bilgisi
              <span className="text-[--link-1]"> {user.email}</span> mail
              adresinize iletilecektir. Bu kodu girdiğinizde Pentegrasyon
              servisi çalışmaya başlayacaktır.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={() => toast.remove(t?.id)}
              className="text-sm py-2 px-3 bg-[--status-red] text-[--red-1] rounded-md border border-[--red-1]"
            >
              İptal
            </button>
            <button
              onClick={() => {
                toast.remove(t?.id);
                handleAddOrUpdate(licenseData);
              }}
              className="text-sm py-2 px-3 bg-[--primary-1] text-white rounded-md whitespace-nowrap"
            >
              Kaydet & Gönder
            </button>
          </div>
        </div>
      );
    };
    toast.custom((t) => confirmation(t), {
      position: "top-center",
      duration: 60000,
      id: "LICENSE_ENTEGRATION_COMFIRMATION",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(licenseData, licenseDataBefore)) {
      toast.error("Herhangi bir değişiklik yapmadınız.");
      return;
    }

    if (isSendShouldBeSent()) {
      confirmAndContinue();
      return;
    }
    const inData = { ...licenseData, sendYemekSepetiEmailNotify: false };
    handleAddOrUpdate(inData);
  }

  //CHECK IF THE SEND EMAIL IS CHOOOSEN
  function isSendShouldBeSent() {
    if (data.isSettingsAdded) {
      if (
        licenseData.sellerId !== licenseDataBefore.sellerId ||
        licenseData.chainCode !== licenseDataBefore.chainCode
      ) {
        if (licenseData.sendYemekSepetiEmailNotify) return true;
      }
    }
    if (!data.isSettingsAdded) return true;
    return false;
  }

  function handleAddOrUpdate(inData) {
    if (data.isSettingsAdded) {
      // dispatch(updateIntegrationInformation(inData));
    } else {
      // dispatch(addIntegrationInformation(inData));
    }
  }

  function showToast() {
    const message = {
      title: "Entegrasyon geçişi için Yemeksepeti'ne mail gönderildi  ✅",
      content:
        "Yemeksepeti tarafından Entegrasyon geçişleri sadece Salı, Çarşamba ve Perşembe günleri olarak belirlenmiştir.. Entegrasyon geçişi yapıldığında Chain Code bilgisi tarafınıza iletilecektir. Bu kodu girdiğinizde Pentegrasyon servisi çalışmaya başlayacaktır.",
    };
    if (isSendShouldBeSent()) {
      toast.custom((t) => CustomToast({ color: "green", message, t }), {
        position: "top-right",
        duration: 60000,
        id: "LICENSE_ENTEGRATED",
      });
    } else {
      toast.success("İşleminiz başarıyla gerçekleşti.");
    }
  }

  useEffect(() => {
    if (data?.isSettingsAdded) {
      dispatch(getIntegrationInformationByLicenseId(data.id));
    }
  }, [data?.isSettingsAdded]);

  // TOAST GET THEN SET
  useEffect(() => {
    if (getError) {
      dispatch(resetGetIntegrationInformationByLicenseId());
    }
    if (infoData) {
      const data = {
        ...licenseData,
        sellerId: infoData.sellerId,
        remoteId: infoData.remoteId,
        chainCode: infoData.chainCode,
        commissionRate: infoData.commissionRate,
        yemekSepetiIntegrationInformationId: infoData.id,
        useExternalCourierService: infoData.useExternalCourierService,
      };
      setLicenseData(data);
      setLicenseDataBefore(data);
      dispatch(resetGetIntegrationInformationByLicenseId());
    }
  }, [getLoading, infoData, getError]);

  // TOAST ADD
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (error) {
      dispatch(resetAddIntegrationInformation());
    } else if (success) {
      toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      showToast();
      dispatch(resetAddIntegrationInformation());
    }
  }, [loading, success, error]);

  // TOAST UPDATE
  useEffect(() => {
    if (updateLoad) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (updateErr) {
      dispatch(resetUpdateIntegrationInformation());
    } else if (updateSucc) {
      toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      showToast();
      dispatch(resetUpdateIntegrationInformation());
    }
  }, [updateLoad, updateSucc, updateErr]);

  return (
    <div className="flex flex-col items-center w-full text-base">
      <div className="flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative max-w-xl">
        <div className="absolute top-4 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <div className="text-center text-xl font-bold">
          <p>
            {data.restaurantName} - {licenseTypeIds[data.licenseTypeId].label}
          </p>
          <p className="text-lg">Entegrasyon Parametreleri</p>
        </div>

        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}>
            <div>
              <CustomInput
                required
                maxLength={4}
                minLength={4}
                label={
                  <span>
                    Platform Satıcı ID{" "}
                    <span className="text-[--red-1]">
                      DİKKAT ! BÜYÜK / Küçük harfe duyarlıdır !
                    </span>
                  </span>
                }
                placeholder="Platform Satıcı ID"
                className="py-[.45rem] text-sm"
                value={licenseData.sellerId}
                onChange={(e) => {
                  const pattern = /^[a-zA-Z0-9]*$/; // Allow only letters and numbers
                  if (pattern.test(e)) {
                    // If valid, update state
                    setLicenseData((prev) => ({
                      ...prev,
                      sellerId: e,
                    }));
                  }
                }}
              />
            </div>

            <div>
              <CustomInput
                label="Chain Code"
                placeholder="Chain Code"
                className="py-[.45rem] text-sm"
                value={licenseData.chainCode}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      chainCode: e,
                    };
                  });
                }}
              />
            </div>

            {licenseData.remoteId && (
              <div>
                <CustomInput
                  disabled
                  label="remoteId"
                  placeholder="remoteId"
                  className="py-[.45rem] text-sm"
                  value={licenseData.remoteId}
                  // onChange={(e) => {
                  //   setLicenseData((prev) => {
                  //     return {
                  //       ...prev,
                  //       remoteId: e,
                  //     };
                  //   });
                  // }}
                />
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <p className="hidden justify-center items-center sm:flex -ml-5">
                %
              </p>
              <CustomInput
                type="number"
                label="Komisyon Oranı (%)"
                placeholder="Komisyon Oranı"
                className="py-[.45rem] text-sm mt-[0] sm:mt-[0]"
                className2="mt-[0] sm:mt-[0]"
                value={licenseData.commissionRate}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      commissionRate: e,
                    };
                  });
                }}
                disabled={/* data?.isSettingsAdded || */ getLoading}
              />
            </div>

            <div className="mt-3">
              <CustomCheckbox
                label="Harici Kurye Servisi Kullan"
                checked={licenseData.useExternalCourierService}
                onChange={() => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      useExternalCourierService:
                        !licenseData.useExternalCourierService,
                    };
                  });
                }}
              />
            </div>

            {data.isSettingsAdded &&
              (licenseData.sellerId !== licenseDataBefore.sellerId ||
                licenseData.chainCode !== licenseDataBefore.chainCode) && (
                <div className="mt-3">
                  <CustomCheckbox
                    label="YemekSepetine Entegrasyon Talebi Maili Gönder"
                    checked={licenseData.sendYemekSepetiEmailNotify}
                    onChange={() => {
                      setLicenseData((prev) => {
                        return {
                          ...prev,
                          sendYemekSepetiEmailNotify:
                            !licenseData.sendYemekSepetiEmailNotify,
                        };
                      });
                      setLicenseDataBefore((prev) => {
                        return {
                          ...prev,
                          sendYemekSepetiEmailNotify:
                            !licenseData.sendYemekSepetiEmailNotify,
                        };
                      });
                    }}
                  />
                </div>
              )}

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={loading || getLoading /* || data.isSettingsAdded */}
                className="text-sm w-20 py-2 px-3 bg-[--primary-1] text-white rounded-md"
                type="submit"
              >
                {"Kaydet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default YemekSepetiLicenseSettings;
