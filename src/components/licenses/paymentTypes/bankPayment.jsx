import { useSelector } from "react-redux";
import CustomFileInput from "../../common/customFileInput";
import CustomInput from "../../common/customInput";
import BackButton from "../stepsAssets/backButton";
import ForwardButton from "../stepsAssets/forwardButton";
import { useState } from "react";
import { groupByRestaurantId } from "../../../utils/utils";

import Getiryemek from "../../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../../assets/img/packages/Yemeksepeti.png";

const imageSRCs = [
  { src: Getiryemek, name: "Getiryemek" },
  { src: MigrosYemek, name: "MigrosYemek" },
  { src: TrendyolYemek, name: "TrendyolYemek" },
  { src: Yemeksepeti, name: "Yemeksepeti" },
  { src: GoFody, name: "GoFody" },
  { src: Siparisim, name: "Siparisim" },
];

const BankPayment = ({ setStep }) => {
  const cartItems = useSelector((state) => state.cart.items);

  const [document, setDocument] = useState("");
  const [explanation, setExplanation] = useState("");
  const [licensePackageData, setLicensePackageData] = useState(
    groupByRestaurantId(cartItems)
  );

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-3xl mx-auto pt-5">
        <div>
          <p>Dekontunuz kontrol edildikten sonra</p>
          {licensePackageData &&
            licensePackageData.map((pkg) => (
              <div>
                <p className="w-max mt-1 mb-1 border-b border-[--primary-1]">
                  <span className="text-[--primary-1] pr-1">
                    {pkg[0].restaurantName}
                  </span>
                  Restoran'a
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 pb-2">
                  {pkg.map((item, i) => (
                    <div className="flex text-sm">
                      <p className="mt-1 pr-2">
                        {imageSRCs[item.marketplaceId].name}
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
            required
          />
        </div>

        {/* BTNS */}
        <div className="flex gap-3 absolute -bottom-16 -right-0">
          <BackButton
            text="Geri"
            letIcon={true}
            onClick={() => setStep(2)}
            disabled={false} //loading}
          />
          <ForwardButton
            text="Devam"
            letIcon={true}
            type="submit"
            disabled={false} //loading}
          />
        </div>
      </div>
    </form>
  );
};

export default BankPayment;
