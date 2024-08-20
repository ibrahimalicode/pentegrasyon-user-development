import { useEffect, useRef, useState } from "react";
import CustomInput from "../../common/customInput";
import CustomToggle from "../../common/customToggle";
import CustomPhoneInput from "../../common/customPhoneInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getSMSParameters,
  resetgetSMSParametersState,
} from "../../../redux/generalVars/sms/getSMSParametersSlice";
import toast from "react-hot-toast";
import { isEqual } from "lodash";
import {
  resetupdateSMSParameterState,
  updateSMSParameter,
} from "../../../redux/generalVars/sms/updateSMSParametersSlice";

function SMSSection() {
  const dispatch = useDispatch();
  const toastId = useRef();

  const { loading, success, error } = useSelector(
    (state) => state.generalVars.updateSMSParams
  );

  const {
    success: getSMSParamsSuccess,
    error: getSMSParamsError,
    smsParameters,
  } = useSelector((state) => state.generalVars.getSMSParams);

  const [smsDataBefore, setSmsDataBefore] = useState(null);
  const [smsData, setSmsData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(smsData, smsDataBefore)) {
      toast.error("Hiç bir deişiklik yapmadınız!");
      return;
    }
    dispatch(updateSMSParameter({ smsData }));
  }

  useEffect(() => {
    if (!smsData) {
      dispatch(getSMSParameters());
    }
  }, [smsData]);

  // TOAST FOR GET
  useEffect(() => {
    if (getSMSParamsError) {
      if (getSMSParamsError?.message_TR) {
        toast.error(getSMSParamsError.message_TR + "🙁");
      } else {
        toast.error("Something went wrong 🙁");
      }
      dispatch(resetgetSMSParametersState());
    }
    if (getSMSParamsSuccess) {
      const { smsUsername, smsPassword, smsTitle, smsnlss } = smsParameters;

      const data = {
        smsUsername,
        smsPassword,
        smsTitle,
        smsnlss,
        phoneNumber: "90",
        message: "",
      };
      // console.log(data);
      setSmsDataBefore(data);
      setSmsData(data);
      dispatch(resetgetSMSParametersState());
    }
  }, [getSMSParamsSuccess, getSMSParamsError]);

  // TOAST FOR EDIT
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("İşleniyor...");
    }
    if (error) {
      toast.dismiss(toastId.current);
      if (error?.message_TR) {
        toast.error(error.message_TR + "🙁");
      } else {
        toast.error("Something went wrong 🙁");
      }
      dispatch(resetupdateSMSParameterState());
    }
    if (success) {
      toast.dismiss(toastId.current);
      toast.success("SMS Parametreleri başarıyla güncelendi.");
      dispatch(resetupdateSMSParameterState());
    }
  }, [success, loading, error]);

  return (
    <section className="flex flex-col items-start pt-3.5 pb-32 pr-20 pl-6 mt-10 w-full bg-white min-h-0 max-md:px-5">
      <main className="w-full">
        <div>
          <label htmlFor="SMS">SMS API URL:</label>
          <p id="SMS" className="text-[--gr-3] font-light">
            <span>https://sms.telsam.com.tr:9588/direct/?cmd=sendsms&</span>
            <span>kullanici=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData ? smsData.smsUsername : ""}
            </span>
            <span>]&sifre=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData ? smsData.smsPassword : ""}
            </span>
            <span>]&mesaj=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData ? smsData.message : ""}
            </span>
            <span>]&gsm=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData ? smsData.phoneNumber.slice(1) : ""}
            </span>
            <span>]&nlss=</span>
            <span className="text-[--primary-1] font-normal">
              {smsData ? (smsData.smsnlss ? 1 : 0) : ""}
            </span>
            <span>&baslik=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData ? smsData.smsTitle : ""}
            </span>
            <span>]</span>
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="sm:pr-14 xl:pr-32">
            <div className="flex gap-4 max-sm:flex-col">
              <CustomInput
                label="Kullanıcı Adı"
                placeholder="Kullanıcı Adı"
                className="rounded-xl"
                value={smsData ? smsData.smsUsername : ""}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      smsUsername: e,
                    };
                  });
                }}
              />
              <CustomInput
                label="Parola"
                placeholder="Parola"
                className="rounded-xl"
                value={smsData ? smsData.smsPassword : ""}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      smsPassword: e,
                    };
                  });
                }}
              />
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <div className="flex w-full gap-4 items-end">
                <CustomInput
                  label="Enable_starttls"
                  placeholder="Enable_starttls"
                  className="rounded-xl"
                  value={smsData ? (smsData.smsnlss ? 1 : 0) : ""}
                  onChange={() => {}}
                  readOnly
                />
                <CustomToggle
                  className="mb-2"
                  checked={smsData ? smsData.smsnlss : false}
                  onChange={() => {
                    setSmsData((prev) => {
                      return {
                        ...prev,
                        smsnlss: !smsData?.smsnlss,
                      };
                    });
                  }}
                />
              </div>

              <CustomInput
                label="SMS Basligi"
                placeholder="SMS Basligi"
                className="rounded-xl"
                value={smsData ? smsData.smsTitle : ""}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      smsTitle: e,
                    };
                  });
                }}
              />
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <CustomInput
                label="Mesaj"
                placeholder="Mesaj"
                className="rounded-xl"
                value={smsData ? smsData.message : ""}
                onChange={(e) => {
                  setSmsDataBefore((prev) => {
                    return {
                      ...prev,
                      message: e,
                    };
                  });
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      message: e,
                    };
                  });
                }}
              />
              <div className="flex gap-4 w-full">
                <CustomPhoneInput
                  label="Tel No"
                  placeholder="Tel No"
                  className="rounded-xl"
                  value={smsData ? smsData.phoneNumber : "90"}
                  onChange={(phone) => {
                    setSmsDataBefore((prev) => {
                      return {
                        ...prev,
                        phoneNumber: phone,
                      };
                    });
                    setSmsData((prev) => {
                      return {
                        ...prev,
                        phoneNumber: phone,
                      };
                    });
                  }}
                />
                <button
                  type="button"
                  className="px-4 py-2.5 text-[--white-1] bg-[--primary-1] rounded-xl self-end"
                >
                  Test
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-2.5 text-[--white-1] bg-[--primary-1] rounded-xl self-end"
              onClick={handleSubmit}
            >
              Kaydet
            </button>
          </div>
        </form>

        <form>
          <h1 className="gap-2.5 self-stretch py-2 w-full text-lg border-b border-[--border-1] max-sm:mt-8 max-md:max-w-full">
            Ayarlar
          </h1>
          <div className="flex flex-col gap-4 mt-8">
            <CustomToggle label="Lisans Hatırlatma" />
            <CustomToggle
              label="Şifremi Unuttum"
              checked={true}
              onChange={() => {}}
            />
            <CustomToggle label="Yeni Kayıt" />
            <CustomToggle
              label="Bayilik Bilgilendirme"
              checked={true}
              onChange={() => {}}
            />
            <CustomToggle label="Restoran Transfer" />
          </div>
        </form>
      </main>
    </section>
  );
}

export default SMSSection;
