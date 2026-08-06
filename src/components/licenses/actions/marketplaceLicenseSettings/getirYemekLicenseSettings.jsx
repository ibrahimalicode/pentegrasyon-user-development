//COMP
import CustomInput from "../../../common/customInput";
import CustomCheckbox from "../../../common/customCheckbox";
import MarketplaceSettingsForm from "./marketplaceSettingsForm";

//REDUX
import {
  addIntegrationInformation,
  resetAddIntegrationInformation,
} from "../../../../redux/informations/getirYemek/addIntegrationInformationSlice";
import {
  getIntegrationInformationByLicenseId,
  resetGetIntegrationInformationByLicenseId,
} from "../../../../redux/informations/getirYemek/getIntegrationInformationByLicenseIdSlice";
import {
  updateIntegrationInformation,
  resetUpdateIntegrationInformation,
} from "../../../../redux/informations/getirYemek/updateIntegrationInformationSlice";

const CONFIG = {
  stateKey: "getirYemek",
  actions: {
    add: addIntegrationInformation,
    resetAdd: resetAddIntegrationInformation,
    update: updateIntegrationInformation,
    resetUpdate: resetUpdateIntegrationInformation,
    get: getIntegrationInformationByLicenseId,
    resetGet: resetGetIntegrationInformationByLicenseId,
  },
  buildInitialData: (data) => ({
    restaurantSecretKey: data?.restaurantSecretKey || "",
    restaurantId: data.restaurantId,
    licenseId: data.id,
    commissionRate: 0,
    getirYemekIntegrationInformationId: "",
    useExternalCourierService: false,
  }),
  fillFromInfo: (infoData, prev) => ({
    ...prev,
    commissionRate: infoData.commissionRate,
    restaurantSecretKey: infoData.restaurantSecretKey,
    getirYemekIntegrationInformationId: infoData.id,
    useExternalCourierService: infoData.useExternalCourierService,
  }),
  parseError: (error) => {
    let getirError;
    try {
      getirError = JSON.parse(error?.data)?.message;
    } catch (err) {
      /*  */
    }
    return getirError;
  },
  renderFields: ({ licenseData, setLicenseData, getLoading }) => (
    <>
      <div className="flex gap-2">
        <p className="w-2 h-3"></p>
        <CustomInput
          required
          label="Restoran Secret Key"
          placeholder="Restoran Secret Key"
          className="py-[.45rem] text-sm"
          value={licenseData.restaurantSecretKey}
          onChange={(e) => {
            setLicenseData((prev) => {
              return {
                ...prev,
                restaurantSecretKey: e,
              };
            });
          }}
          disabled={/* data?.isSettingsAdded || */ getLoading}
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
          disabled={/* data?.isSettingsAdded || */ getLoading}
        />
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
    </>
  ),
};

const GetirYemekLicenseSettings = ({ data, onSuccess }) => {
  return (
    <MarketplaceSettingsForm data={data} onSuccess={onSuccess} config={CONFIG} />
  );
};

export default GetirYemekLicenseSettings;
