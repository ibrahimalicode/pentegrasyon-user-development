//MODULES
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { CancelI } from "../../../../assets/icon";
import CustomInput from "../../../common/customInput";
import { usePopup } from "../../../../context/PopupContext";
import CustomCheckbox from "../../../common/customCheckbox";
import licenseTypeIds from "../../../../enums/licenseTypeIds";

//REDUX
import {
  addIntegrationInformation,
  resetAddIntegrationInformation,
} from "../../../../redux/informations/trendyolYemek/addIntegrationInformationSlice";
import {
  getIntegrationInformationByLicenseId,
  resetGetIntegrationInformationByLicenseId,
} from "../../../../redux/informations/trendyolYemek/getIntegrationInformationByLicenseIdSlice";
import {
  resetUpdateIntegrationInformation,
  updateIntegrationInformation,
} from "../../../../redux/informations/trendyolYemek/updateIntegrationInformationSlice";
const TrendyolYemekLicenseSettings = ({ data, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.integrationInfos.trendyol.addIntegrationInfo
  );

  const {
    loading: updateLoad,
    success: updateSucc,
    error: updateErr,
  } = useSelector(
    (state) => state.integrationInfos.trendyol.updateIntegrationInfo
  );

  const {
    loading: getLoading,
    error: getError,
    infoData,
  } = useSelector(
    (state) => state.integrationInfos.trendyol.getIntegrationInfo
  );

  const initialData = {
    restaurantId: data.restaurantId,
    licenseId: data.id,
    supplierId: data?.supplierId || "",
    apiKey: data?.apiKey || "",
    storeId: data?.storeId || "",
    apiSecretKey: data?.apiSecretKey || "",
    email: data?.email || "",
    trendyolYemekIntegrationInformationId: "",
    useExternalCourierService: false,
  };

  const [licenseData, setLicenseData] = useState(initialData);
  const [licenseDataBefore, setLicenseDataBefore] = useState(initialData);

  const closeForm = () => {
    setPopupContent(null);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(licenseData, licenseDataBefore)) {
      toast.error("Herhangi bir değişiklik yapmadınız.");
      return;
    }
    if (data.isSettingsAdded) {
      dispatch(updateIntegrationInformation(licenseData));
    } else {
      dispatch(addIntegrationInformation(licenseData));
    }
  }

  useEffect(() => {
    if (data?.isSettingsAdded) {
      dispatch(getIntegrationInformationByLicenseId(data.id));
    }
  }, [data?.isSettingsAdded]);

  // TOAST GET
  useEffect(() => {
    if (getError) {
      dispatch(resetGetIntegrationInformationByLicenseId());
    }
    if (infoData) {
      const data = {
        ...licenseData,
        supplierId: infoData.supplierId,
        apiKey: infoData.apiKey,
        storeId: infoData.storeId,
        apiSecretKey: infoData.apiSecretKey,
        email: infoData.email,
        commissionRate: infoData.commissionRate,
        restaurantSecretKey: infoData.restaurantSecretKey,
        trendyolYemekIntegrationInformationId: infoData.id,
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
      let getirError;
      try {
        getirError = JSON.parse(error?.data)?.message;
      } catch (err) {
        /*  */
      }
      if (getirError) {
        toast.dismiss();
        toast.error(getirError);
      }
      dispatch(resetAddIntegrationInformation());
    } else if (success) {
      toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success("Lisans ayarları başarıyla eklendi");
      dispatch(resetAddIntegrationInformation());
    }
  }, [loading, success, error]);

  // TOAST UPDATE
  useEffect(() => {
    if (updateLoad) {
      toastId.current = toast.loading("İşleniyor 🤩...");
    }
    if (updateErr) {
      let getirError;
      try {
        getirError = JSON.parse(updateErr?.data)?.message;
      } catch (err) {
        /*  */
      }
      if (getirError) {
        toast.dismiss();
        toast.error(getirError);
      }
      dispatch(resetUpdateIntegrationInformation());
    } else if (updateSucc) {
      toast.dismiss(toastId.current);
      onSuccess();
      closeForm();
      toast.success("Lisans ayarları başarıyla düzenlendi.");
      dispatch(resetUpdateIntegrationInformation());
    }
  }, [updateLoad, updateSucc, updateErr]);

  return (
    <div className="flex flex-col items-center w-full text-base">
      <div className="flex flex-col w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] relative">
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
            <div className="flex max-sm:flex-col gap-2">
              <CustomInput
                required
                label="Satıcı ID"
                placeholder="Satıcı ID"
                className="py-[.45rem] text-sm"
                value={licenseData.supplierId}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      supplierId: e,
                    };
                  });
                }}
                disabled={/* data?.isSettingsAdded || */ getLoading}
              />
              <CustomInput
                required
                label="API Key"
                placeholder="API Key"
                className="py-[.45rem] text-sm"
                value={licenseData.apiKey}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      apiKey: e,
                    };
                  });
                }}
                disabled={/* data?.isSettingsAdded || */ getLoading}
              />
            </div>

            <div className="flex max-sm:flex-col gap-2">
              <CustomInput
                required
                label="Mağaza ID"
                placeholder="Mağaza ID"
                className="py-[.45rem] text-sm"
                value={licenseData.storeId}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      storeId: e,
                    };
                  });
                }}
                disabled={/* data?.isSettingsAdded || */ getLoading}
              />
              <CustomInput
                required
                label="API Secret Key"
                placeholder="API Secret Key"
                className="py-[.45rem] text-sm"
                value={licenseData.apiSecretKey}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      apiSecretKey: e,
                    };
                  });
                }}
                disabled={/* data?.isSettingsAdded || */ getLoading}
              />
            </div>

            <div className="flex max-sm:flex-col gap-2">
              <CustomInput
                required
                label="E-Posta"
                placeholder="E-Posta"
                className="py-[.45rem] text-sm"
                value={licenseData.email}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      email: e,
                    };
                  });
                }}
                disabled={/* data?.isSettingsAdded || */ getLoading}
              />
            </div>

            <div className="flex gap-2 mt-6">
              <CustomInput
                type="number"
                label="Komisyon Oranı"
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
              <p className="w-2 pt-6">%</p>
            </div>

            <div className="mt-6 pl-4">
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

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={loading || getLoading /* || data.isSettingsAdded */}
                className="text-sm w-20 py-2 px-3 bg-[--primary-1] text-white rounded-md"
                type="submit"
              >
                {data.isSettingsAdded ? "Kaydet" : "Ekle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrendyolYemekLicenseSettings;
