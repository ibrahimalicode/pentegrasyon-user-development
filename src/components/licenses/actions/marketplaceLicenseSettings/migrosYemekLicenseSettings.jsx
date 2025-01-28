//MODULES
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { CancelI } from "../../../../assets/icon";
import CustomInput from "../../../common/customInput";

//UTILS
import { usePopup } from "../../../../context/PopupContext";
import licenseTypeIds from "../../../../enums/licenseTypeIds";

//REDUX
import {
  addIntegrationInformation,
  resetAddIntegrationInformation,
} from "../../../../redux/informations/migrosYemek/addIntegrationInformationSlice";
import {
  getIntegrationInformationByLicenseId,
  resetGetIntegrationInformationByLicenseId,
} from "../../../../redux/informations/migrosYemek/getIntegrationInformationByLicenseIdSlice";
import {
  resetUpdateIntegrationInformation,
  updateIntegrationInformation,
} from "../../../../redux/informations/migrosYemek/updateIntegrationInformationSlice";

const MigrosYemekLicenseSettings = ({ data, onSuccess }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const { setPopupContent } = usePopup();

  const { loading, success, error } = useSelector(
    (state) => state.integrationInfos.migrosYemek.addIntegrationInfo
  );

  const {
    loading: updateLoad,
    success: updateSucc,
    error: updateErr,
  } = useSelector(
    (state) => state.integrationInfos.migrosYemek.updateIntegrationInfo
  );

  const {
    loading: getLoading,
    error: getError,
    infoData,
  } = useSelector(
    (state) => state.integrationInfos.migrosYemek.getIntegrationInfo
  );

  const initialData = {
    apiKey: "",
    storeId: "",
    storeGroupId: "",
    commissionRate: "",
    MigrosYemekIntegrationInformationId: "",
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
        apiKey: infoData.apiKey,
        storeId: infoData.storeId,
        storeGroupId: infoData.storeGroupId,
        commissionRate: infoData.commissionRate,
        MigrosYemekIntegrationInformationId: infoData.id,
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
            <div className="flex gap-2">
              <p className="w-2 h-3"></p>
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
                disabled={getLoading}
              />
            </div>
            <div className="flex gap-2">
              <p className="w-2 h-3"></p>
              <CustomInput
                required
                label="Store Id"
                placeholder="Store Id"
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
                disabled={getLoading}
              />
            </div>
            <div className="flex gap-2">
              <p className="w-2 h-3"></p>
              <CustomInput
                required
                label="Store Group Id"
                placeholder="Store Group Id"
                className="py-[.45rem] text-sm"
                value={licenseData.storeGroupId}
                onChange={(e) => {
                  setLicenseData((prev) => {
                    return {
                      ...prev,
                      storeGroupId: e,
                    };
                  });
                }}
                disabled={getLoading}
              />
            </div>
            <div className="flex gap-2 mt-6">
              <p className="flex justify-center items-center w-2">%</p>
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
                disabled={getLoading}
              />
            </div>

            <div className="w-full flex justify-end mt-10">
              <button
                disabled={loading || getLoading}
                className="text-sm w-20 py-2 px-3 bg-[--primary-1] text-[--white-1] rounded-md"
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

export default MigrosYemekLicenseSettings;
