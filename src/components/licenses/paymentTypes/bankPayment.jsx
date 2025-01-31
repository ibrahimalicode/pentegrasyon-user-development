//MODULES
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import CustomInput from "../../common/customInput";
import BackButton from "../stepsAssets/backButton";
import ForwardButton from "../stepsAssets/forwardButton";
import CustomFileInput from "../../common/customFileInput";
import { getPriceWithKDV, groupByRestaurantId } from "../../../utils/utils";

//IMAGES
import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";
import Autoronics from "../../../assets/img/packages/Autoronics.png";

//REDUX
import {
  addByBankPay,
  resetAddByBankPay,
} from "../../../redux/licenses/addLicense/addByBankPaySlice";
import { clearCart } from "../../../redux/cart/cartSlice";

const imageSRCs = [
  { src: Getiryemek, name: "Getiryemek" },
  { src: MigrosYemek, name: "MigrosYemek" },
  { src: TrendyolYemek, name: "TrendyolYemek" },
  { src: Yemeksepeti, name: "Yemeksepeti" },
  { src: GoFody, name: "GoFody" },
  { src: Siparisim, name: "Siparisim" },
  { src: Autoronics, name: "Autoronics" },
];

const BankPayment = ({ user, step, setStep, actionType, setPaymentStatus }) => {
  const toastId = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentLicense } = location?.state || {};

  const isPageExtend = actionType === "extend-license";

  const cartItems = useSelector((state) => state.cart.items);
  const { success, loading, error } = useSelector(
    (state) => state.licenses.addByBank
  );

  const [document, setDocument] = useState("");
  const [explanation, setExplanation] = useState("");
  const licensePackageData = groupByRestaurantId(cartItems);

  function handleSubmit(e) {
    e.preventDefault();
    const { city, district, neighbourhood } = user.userInvoiceAddressDTO;
    const paymentAmount = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    const addLicenseBasket = cartItems.reduce((result, item) => {
      const existingRestaurant = result.find(
        (restaurant) => restaurant.restaurantId === item.restaurantId
      );

      if (existingRestaurant) {
        existingRestaurant.licensePackageIds.push(item.id);
      } else {
        result.push({
          restaurantId: item.restaurantId,
          licensePackageIds: [item.id],
        });
      }

      return result;
    }, []);

    const { licensePackageId, restaurantId } = cartItems[0];
    const extendLicenseBasket = {
      licensePackageId,
      restaurantId,
      licenseId: currentLicense?.id,
    };

    // Create a FormData object
    const formData = new FormData();
    // formData.append("UserId", user.id);
    formData.append("UserName", user.fullName);
    formData.append("UserEmail", user.email);
    formData.append("UserPhoneNumber", user.phoneNumber);
    formData.append("UserAddress", `${city}/${district}/${neighbourhood}`);
    formData.append(
      "UserBasket",
      isPageExtend
        ? JSON.stringify(extendLicenseBasket)
        : JSON.stringify(addLicenseBasket)
    );
    formData.append("PaymentType", "Bank");
    formData.append("PaymentAmount", paymentAmount.toString());
    formData.append("Description", explanation);
    formData.append("Receipt", document);

    if (isPageExtend) {
      // dispatch(extendByBankPay(data));
    } else {
      dispatch(addByBankPay(formData));
    }
  }

  // ADD SUCCESS
  useEffect(() => {
    if (loading) {
      toastId.current = toast.loading("Loading...");
    }
    if (success) {
      setStep(6);
      toast.remove(toastId.current);
      setPaymentStatus("success");
      dispatch(resetAddByBankPay());
    }
    if (error) {
      setStep(6);
      toast.remove(toastId.current);
      window.parent.postMessage({ status: "failed" }, "*");
      dispatch(resetAddByBankPay());
    }

    return () => {
      if (cartItems) {
        dispatch(clearCart());
      }
    };
  }, [loading, success, error]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-3xl mx-auto pt-5">
        <div>
          <p>Dekontunuz kontrol edildikten sonra</p>
          {licensePackageData &&
            licensePackageData.map((pkg, i) => (
              <div key={i}>
                <p className="w-max mt-1 mb-1 border-b border-[--primary-1]">
                  <span className="text-[--primary-1] pr-1">
                    {pkg[0].restaurantName}
                  </span>
                  Restoran&apos;a
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 pb-2">
                  {pkg.map((item, i) => (
                    <div key={i} className="flex text-sm">
                      <p className="mt-1 pr-2">
                        {imageSRCs[item.licenseTypeId]?.name}
                      </p>
                      <p className="mt-1">
                        {item.time} Yıllık{i < pkg.length - 1 && ","}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          <p className="pt-1.5 mb-6">Lisans eklenecek.</p>
        </div>

        <div>
          <CustomInput
            label="Açıklama"
            placeholder="Açıklama"
            className="text-sm mb-4"
            className2="mt-[0] sm:mt-[0]"
            value={explanation}
            onChange={(e) => setExplanation(e)}
          />
        </div>
        <div className="">
          <CustomFileInput
            className="h-[8rem] p-4"
            value={document}
            onChange={setDocument}
            accept={"image/png, image/jpeg, application/pdf"}
            required={!document}
          />
        </div>

        {/* BTNS */}
        <div className="flex gap-3 absolute -bottom-16 -right-0">
          <BackButton
            text="Geri"
            letIcon={true}
            onClick={() => setStep(step - 1)}
            disabled={false} //loading}
          />
          <ForwardButton
            text="Devam"
            letIcon={true}
            type="submit"
            disabled={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default BankPayment;
