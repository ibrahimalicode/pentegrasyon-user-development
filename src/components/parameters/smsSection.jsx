import { useState } from "react";
import CustomInput from "../common/CustomInput";
import CustomToggle from "../common/customToggle";
import CustomPhoneInput from "../common/customPhoneInput";

function SMSSection() {
  const [smsData, setSmsData] = useState({
    userName: "KullanıcıAdı",
    password: "Parola",
    message: "Mesaj",
    phoneNumber: "05",
    nlss: "1",
    smsInfo: "SMSBasligi",
    testSMS: "test@gmail.com",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Save");
  }

  return (
    <section className="flex flex-col items-start pt-3.5 pb-32 pr-20 pl-6 mt-10 w-full bg-white min-h-0 max-md:px-5">
      <main className="w-full">
        <div>
          <label htmlFor="SMS">SMS API URL:</label>
          <p id="SMS" className="text-[--gr-3] font-light">
            <span>https://sms.telsam.com.tr:9588/direct/?cmd=sendsms&</span>
            <span>kullanici=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData.userName}
            </span>
            <span>]&sifre=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData.password}
            </span>
            <span>]&mesaj=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData.message}
            </span>
            <span>]&gsm=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData.phoneNumber.slice(1)}
            </span>
            <span>]&nlss=</span>
            <span className="text-[--primary-1] font-normal">
              {smsData.nlss}
            </span>
            <span>&baslik=[:</span>
            <span className="text-[--primary-1] font-normal">
              {smsData.smsInfo}
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
                label="Mesaj"
                placeholder="Mesaj"
                className="rounded-xl"
                value={smsData.message}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      message: e.target.value,
                    };
                  });
                }}
              />
              <CustomPhoneInput
                label="Tel No"
                placeholder="Tel No"
                className="rounded-xl"
                value={smsData.phoneNumber}
                onChange={(phone) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      phoneNumber: phone,
                    };
                  });
                }}
              />
            </div>

            <div className="flex gap-4 max-sm:flex-col">
              <CustomInput
                label="Nlss"
                type="number"
                placeholder="Nlss"
                className="rounded-xl"
                value={smsData.nlss}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      nlss: e.target.value,
                    };
                  });
                }}
              />
              <CustomInput
                label="SMS Basligi"
                placeholder="SMS Basligi"
                className="rounded-xl"
                value={smsData.smsInfo}
                onChange={(e) => {
                  setSmsData((prev) => {
                    return {
                      ...prev,
                      smsInfo: e.target.value,
                    };
                  });
                }}
              />
            </div>

            <div className="flex w-full sm:justify-end">
              <div className="flex gap-4 max-sm:mt-4 w-full sm:w-1/2">
                <CustomInput
                  label="Test SMS"
                  placeholder="Test SMS"
                  className="rounded-xl"
                  value={smsData.testSMS}
                  onChange={(e) => {
                    setSmsData((prev) => {
                      return {
                        ...prev,
                        testSMS: e.target.value,
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
