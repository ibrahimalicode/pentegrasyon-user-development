import { useState } from "react";
import CustomInput from "../../common/customInput";
import CustomPhoneInput from "../../common/customPhoneInput";
import CustomTextarea from "../../common/customTextarea";
import Button from "../../common/button";
import { ArrowID, ArrowIU } from "../../../assets/icon";

const PaymentCardForm = ({ setFlip, cardData, setCardData }) => {
  const [openFatura, setOpenFatura] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    city: "",
    district: "",
    neigh: "",
    address: "",
  });

  return (
    <form>
      {/* CARD INFO */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="w-full">
          <CustomInput
            label="Ad Soyad"
            type="text"
            placeholder="Ad Soyad"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={30}
            value={cardData.userName}
            onChange={(e) =>
              setCardData((prev) => {
                return {
                  ...prev,
                  userName: e,
                };
              })
            }
            onClick={() => setFlip(false)}
          />
        </div>
        <div className="w-full">
          <CustomInput
            label="Kart No"
            type="number"
            placeholder="Kart No"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={16}
            value={cardData.cardNumber}
            onChange={(e) =>
              setCardData((prev) => {
                return {
                  ...prev,
                  cardNumber: e,
                };
              })
            }
            onClick={() => setFlip(false)}
          />
        </div>
        <div className="w-full flex gap-2">
          <CustomInput
            label="Ay"
            type="number"
            placeholder="Ay"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={2}
            value={cardData.month}
            onChange={(e) =>
              setCardData((prev) => {
                return {
                  ...prev,
                  month: e < 13 ? e : prev.month,
                };
              })
            }
            onClick={() => setFlip(false)}
          />
          <CustomInput
            label="Yıl"
            type="number"
            placeholder="Yıl"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={2}
            value={cardData.year}
            onChange={(e) =>
              setCardData((prev) => {
                return {
                  ...prev,
                  year: e,
                };
              })
            }
            onClick={() => setFlip(false)}
          />
          <CustomInput
            label="CVV"
            type="number"
            placeholder="CVV"
            className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
            className2="mt-[0] sm:mt-[0]"
            required
            maxLength={3}
            value={cardData.cvv}
            onChange={(e) =>
              setCardData((prev) => {
                return {
                  ...prev,
                  cvv: e,
                };
              })
            }
            onClick={() => setFlip(true)}
          />
        </div>
      </div>

      {/* FATURA ADDRESS */}
      <div>
        <div
          className="w-full flex items-center border-b border-solid border-[--border-1] cursor-pointer mt-10"
          onClick={() => setOpenFatura(!openFatura)}
        >
          <h1 className="w-full text-center text-base font-normal text-[--black-3]">
            Fatura Bilgileriniz
          </h1>
          <span>
            {openFatura ? (
              <ArrowIU className="size-[14px]" />
            ) : (
              <ArrowID className="size-[14px]" />
            )}
          </span>
        </div>

        {openFatura && (
          <div className="mt-4 flex flex-col gap-3">
            <div className="w-full flex max-sm:flex-col gap-2">
              <CustomInput
                label="Ad"
                placeholder="Ad"
                className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
                className2="mt-[0] sm:mt-[0]"
                type="text"
                maxLength={20}
                required
                value={userData.firstName}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      firstName: e,
                    };
                  })
                }
              />
              <CustomInput
                label="Soyad"
                placeholder="Soyad"
                className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
                className2="mt-[0] sm:mt-[0]"
                type="text"
                maxLength={20}
                required
                value={userData.lastName}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      lastName: e,
                    };
                  })
                }
              />
            </div>
            <div className="w-full flex max-sm:flex-col gap-2">
              <CustomInput
                label="E-Posta"
                placeholder="E-Posta"
                className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
                className2="mt-[0] sm:mt-[0]"
                type="email"
                required
                maxLength={30}
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      email: e,
                    };
                  })
                }
              />
              <CustomPhoneInput
                label="Tel"
                placeholder="Tel"
                required
                className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
                className2="mt-[0] sm:mt-[0]"
                value={userData.phoneNumber}
                onChange={(phone) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      phoneNumber: phone,
                    };
                  })
                }
              />
            </div>
            <div className="w-full flex max-sm:flex-col gap-2">
              <CustomInput
                label="İl"
                placeholder="İl"
                className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
                className2="mt-[0] sm:mt-[0]"
                type="text"
                required
                maxLength={20}
                value={userData.city}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      city: e,
                    };
                  })
                }
              />
              <CustomInput
                label="İlçe"
                placeholder="İlçe"
                className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
                className2="mt-[0] sm:mt-[0]"
                type="text"
                required
                maxLength={20}
                value={userData.district}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      district: e,
                    };
                  })
                }
              />
            </div>
            <div className="w-full flex max-sm:flex-col gap-2">
              <CustomInput
                label="Mahalle"
                placeholder="Mahalle"
                className="text-[13px] py-[6px] sm:mt-[4px] mt-[4px]"
                className2="mt-[0] sm:mt-[0]"
                type="text"
                required
                maxLength={20}
                value={userData.neigh}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      neigh: e,
                    };
                  })
                }
              />
              <CustomTextarea
                label="Adres"
                placeholder="Adres"
                className="text-sm py-1 mt-1 max-sm:h-9"
                type="text"
                required
                maxLength={40}
                value={userData.address}
                onChange={(e) =>
                  setUserData((prev) => {
                    return {
                      ...prev,
                      address: e,
                    };
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex justify-end mt-8">
        <Button text="Öde" className="px-5" />
      </div>
    </form>
  );
};

export default PaymentCardForm;
