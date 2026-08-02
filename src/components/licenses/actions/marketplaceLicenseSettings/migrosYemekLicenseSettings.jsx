//COMP
import CustomInput from "../../../common/customInput";
import CustomCheckbox from "../../../common/customCheckbox";
import MarketplaceSettingsForm from "./marketplaceSettingsForm";

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

const CONFIG = {
  stateKey: "migrosYemek",
  actions: {
    add: addIntegrationInformation,
    resetAdd: resetAddIntegrationInformation,
    update: updateIntegrationInformation,
    resetUpdate: resetUpdateIntegrationInformation,
    get: getIntegrationInformationByLicenseId,
    resetGet: resetGetIntegrationInformationByLicenseId,
  },
  buildInitialData: (data) => ({
    apiKey: "",
    storeId: "",
    storeGroupId: "",
    commissionRate: 0,
    licenseId: data.id,
    restaurantId: data.restaurantId,
    MigrosYemekIntegrationInformationId: "",
    useExternalCourierService: false,
  }),
  fillFromInfo: (infoData, prev) => ({
    ...prev,
    apiKey: infoData.apiKey,
    storeId: infoData.storeId,
    storeGroupId: infoData.storeGroupId,
    commissionRate: infoData.commissionRate,
    MigrosYemekIntegrationInformationId: infoData.id,
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
  submitLabel: () => "Kaydet",
  renderFields: ({ licenseData, setLicenseData, getLoading }) => (
    <>
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
          label="Restoran ID"
          placeholder="Restoran ID"
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
          label="Zincir ID"
          placeholder="Zincir ID"
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

const MigrosYemekLicenseSettings = ({ data, onSuccess }) => {
  return (
    <MarketplaceSettingsForm data={data} onSuccess={onSuccess} config={CONFIG} />
  );
};

export default MigrosYemekLicenseSettings;
