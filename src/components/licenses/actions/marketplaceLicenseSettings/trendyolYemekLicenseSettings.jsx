//COMP
import CustomInput from "../../../common/customInput";
import CustomCheckbox from "../../../common/customCheckbox";
import MarketplaceSettingsForm from "./marketplaceSettingsForm";

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

const CONFIG = {
  stateKey: "trendyol",
  wide: true,
  actions: {
    add: addIntegrationInformation,
    resetAdd: resetAddIntegrationInformation,
    update: updateIntegrationInformation,
    resetUpdate: resetUpdateIntegrationInformation,
    get: getIntegrationInformationByLicenseId,
    resetGet: resetGetIntegrationInformationByLicenseId,
  },
  buildInitialData: (data) => ({
    restaurantId: data.restaurantId,
    licenseId: data.id,
    supplierId: data?.supplierId || "",
    apiKey: data?.apiKey || "",
    storeId: data?.storeId || "",
    apiSecretKey: data?.apiSecretKey || "",
    email: data?.email || "",
    trendyolYemekIntegrationInformationId: "",
    useExternalCourierService: false,
  }),
  fillFromInfo: (infoData, prev) => ({
    ...prev,
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
    </>
  ),
};

const TrendyolYemekLicenseSettings = ({ data, onSuccess }) => {
  return (
    <MarketplaceSettingsForm data={data} onSuccess={onSuccess} config={CONFIG} />
  );
};

export default TrendyolYemekLicenseSettings;
