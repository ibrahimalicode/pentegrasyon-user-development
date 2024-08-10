import { useState } from "react";
import CustomInput from "../common/CustomInput";
import CustomToggle from "../common/customToggle";
import LicenseReminder from "./licenseReminder";
import ForgotPassword from "./forgotPassword";
import NewRegister from "./newRegister";
import DealershipInform from "./dealershipInform";
import RestaurantTransfer from "./restaurantTransfer";

function EmailSection() {
  const [smsData, setSmsData] = useState({
    smtp: "stmp-relay-brevo.com",
    port: "587",
    userName: "KullanıcıAdı",
    password: "Parola",
    senderName: "plain",
    ensbleStartTTLS: false,
    testEmail: "test@email.com",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Save");
  }

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
                value={smsData.smtp}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      smtp: e.target.value,
                    };
                  });
                }}
              />

              <CustomInput
                label="Port"
                placeholder="Port"
                className="rounded-xl"
                value={smsData.port}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      port: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <CustomInput
                label="Kullanıcı Adı"
                placeholder="Kullanıcı Adı"
                className="rounded-xl"
                value={smsData.userName}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      userName: e.target.value,
                    };
                  });
                }}
              />
              <CustomInput
                label="Parola"
                placeholder="Parola"
                className="rounded-xl"
                value={smsData.password}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
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
                value={smsData.senderName}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      senderName: e.target.value,
                    };
                  });
                }}
              />
              <div className="flex w-full gap-4 items-end">
                <CustomInput
                  label="Enable_starttls"
                  placeholder="Enable_starttls"
                  className="rounded-xl"
                  value={smsData.ensbleStartTTLS}
                  onChange={() => {}}
                  readOnly
                />
                <CustomToggle
                  className="mb-2"
                  onChange={() => {
                    setSmsData((prev) => {
                      return {
                        ...prev,
                        ensbleStartTTLS: !smsData.ensbleStartTTLS,
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
                  className="rounded-xl"
                  value={smsData.testEmail}
                  onChange={(e) => {
                    setSmsData((prev) => {
                      return {
                        ...prev,
                        testEmail: e.target.value,
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
