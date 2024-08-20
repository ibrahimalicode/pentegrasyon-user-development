import { useEffect, useRef, useState } from "react";
import CustomInput from "../../common/customInput";
import CustomToggle from "../../common/customToggle";
import LicenseReminder from "../licenseReminder";
import ForgotPassword from "../forgotPassword";
import NewRegister from "../newRegister";
import DealershipInform from "../dealershipInform";
import RestaurantTransfer from "../restaurantTransfer";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmailParameters,
  resetGetEmailParametersState,
} from "../../../redux/generalVars/email/getEmailParametersSlice";
import toast from "react-hot-toast";
import { isEqual } from "lodash";
import { sendTestEmail } from "../../../redux/generalVars/email/sendTestEmailSlice";
import {
  resetUpdateEmailParameters,
  updateEmailParameters,
} from "../../../redux/generalVars/email/updateEmailParametersSlice";

function EmailSection() {
  const dispatch = useDispatch();
  const toastId = useRef();
  const { loading, success, error } = useSelector(
    (state) => state.generalVars.updateEmailParams
  );

  const {
    success: getEmailParamsSuccess,
    error: getEmailParamsError,
    emailParameters,
  } = useSelector((state) => state.generalVars.getEmailParams);

  const { loading: testEmailLoading } = useSelector(
    (state) => state.generalVars.sendEmail
  );

  const [emailDataBefore, setEmailDataBefore] = useState(null);
  const [emailData, setEmailData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (isEqual(emailData, emailDataBefore)) {
      toast.error("Hiç bir deişiklik yapmadınız!");
      return;
    }
    dispatch(updateEmailParameters({ emailData }));
  }

  function handleTestEmail() {
    if (!emailData.testEmail) {
      toast.error("Test e-posta adresini giriniz!");
      return;
    }
    dispatch(sendTestEmail(emailData));
  }

  useEffect(() => {
    if (!emailData) {
      dispatch(getEmailParameters());
    }
  }, [emailData]);

  // TOAST FOR GET
  useEffect(() => {
    if (getEmailParamsError) {
      if (getEmailParamsError?.message_TR) {
        toast.error(getEmailParamsError.message_TR + "🙁");
      } else {
        toast.error("Something went wrong 🙁");
      }
      dispatch(resetGetEmailParametersState());
    } else if (getEmailParamsSuccess) {
      const {
        emailSMTP,
        // emailPort,
        email,
        emailPassword,
        emailSenderName,
        emailStartTLS,
        useLicenseRemindingEmail,
        useForgotPasswordEmail,
        useNewRegisterEmail,
        useDealerNotificationEmail,
        useRestaurantTransferEmail,
      } = emailParameters;

      const data = {
        emailSMTP,
        emailPort: emailParameters.emailPort.toString(),
        email,
        emailPassword,
        emailSenderName,
        emailStartTLS,
        testEmail: "",
        useLicenseRemindingEmail,
        useForgotPasswordEmail,
        useNewRegisterEmail,
        useDealerNotificationEmail,
        useRestaurantTransferEmail,
      };
      setEmailDataBefore(data);
      setEmailData(data);
      dispatch(resetGetEmailParametersState());
    }
  }, [getEmailParamsSuccess, getEmailParamsError]);

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
      dispatch(resetUpdateEmailParameters());
    }
    if (success) {
      toast.dismiss(toastId.current);
      toast.success("E-Posta Parametreleri başarıyla güncelendi.");
      dispatch(resetUpdateEmailParameters());
    }
  }, [success, loading, error]);

  useEffect(() => {
    if (testEmailLoading) {
      toastId.current = toast.loading("İşleniyor...");
    } else {
      toast.dismiss(toastId.current);
    }
  }, [testEmailLoading]);

  return (
    <section className="flex flex-col items-start pt-3.5 pb-32 pr-20 pl-6 mt-10 w-full bg-[--white-1] min-h-0 max-md:px-5">
      <main className="w-full">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="sm:pr-14 xl:pr-32">
            <div className="flex gap-4 max-sm:flex-col">
              <CustomInput
                label="SMTP"
                placeholder="SMTP"
                className="rounded-xl"
                value={emailData ? emailData.emailSMTP : ""}
                onChange={(e) => {
                  setEmailData((prev) => {
                    return {
                      ...prev,
                      emailSMTP: e,
                    };
                  });
                }}
              />

              <CustomInput
                label="Port"
                placeholder="Port"
                type="number"
                className="rounded-xl"
                value={emailData ? emailData.emailPort : ""}
                onChange={(e) => {
                  setEmailData((prev) => {
                    return {
                      ...prev,
                      emailPort: e,
                    };
                  });
                }}
              />
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <CustomInput
                label="E-Posta"
                placeholder="E-Posta"
                className="rounded-xl"
                value={emailData ? emailData.email : ""}
                onChange={(e) => {
                  setEmailData((prev) => {
                    return {
                      ...prev,
                      email: e,
                    };
                  });
                }}
              />
              <CustomInput
                label="Parola"
                placeholder="Parola"
                className="rounded-xl"
                value={emailData ? emailData.emailPassword : ""}
                onChange={(e) => {
                  setEmailData((prev) => {
                    return {
                      ...prev,
                      emailPassword: e,
                    };
                  });
                }}
              />
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <CustomInput
                label="Gönderici Adı"
                placeholder="Gönderici Adı"
                className="rounded-xl"
                value={emailData ? emailData.emailSenderName : ""}
                onChange={(e) => {
                  setEmailData((prev) => {
                    return {
                      ...prev,
                      emailSenderName: e,
                    };
                  });
                }}
              />
              <div className="flex w-full gap-4 items-end">
                <CustomInput
                  label="Enable_starttls"
                  placeholder="Enable_starttls"
                  className="rounded-xl"
                  value={emailData ? emailData.emailStartTLS : ""}
                  onChange={() => {}}
                  readOnly
                />
                <CustomToggle
                  className="mb-2"
                  checked={emailData ? emailData.emailStartTLS : false}
                  onChange={() => {
                    setEmailData((prev) => {
                      return {
                        ...prev,
                        emailStartTLS: !emailData?.emailStartTLS,
                      };
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex w-full sm:justify-end">
              <div className="flex gap-4 max-sm:mt-4 sm:w-1/2">
                <CustomInput
                  label="Test Mail"
                  placeholder="Test Mail"
                  type="email"
                  className="rounded-xl"
                  value={emailData ? emailData.testEmail : ""}
                  onChange={(e) => {
                    setEmailData((prev) => {
                      return {
                        ...prev,
                        testEmail: e,
                      };
                    });
                    setEmailDataBefore((prev) => {
                      return {
                        ...prev,
                        testEmail: e,
                      };
                    });
                  }}
                />
                <button
                  type="button"
                  onClick={handleTestEmail}
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

        <LicenseReminder />
        <ForgotPassword />
        <NewRegister />
        <DealershipInform />
        <RestaurantTransfer />
      </main>
    </section>
  );
}

export default EmailSection;
