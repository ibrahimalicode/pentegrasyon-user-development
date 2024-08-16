import LicensePackagesActions from "./actions/licensePackageActions";

// IMAGES
import Getiryemek from "../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../assets/img/packages/Yemeksepeti.png";

const LicensePackagesTable = ({
  inData,
  Actions,
  totalItems = inData.length,
  onSuccess,
  /* KDV, */
}) => {
  const imageSRCs = [
    Getiryemek,
    MigrosYemek,
    TrendyolYemek,
    Yemeksepeti,
    GoFody,
    Siparisim,
  ];

  const KDV = (
    ((inData[0].totalPrice - inData[0].price) / inData[0].price) *
    100
  ).toFixed();
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[50rem] overflow-hidden">
        <div className="w-full text-sm font-light">
          <div className="w-full">
            <div className="flex items-center justify-between bg-[--light-3] h-8 font-normal">
              <div className="w-40 text-center">Pazaryeri</div>
              <div className="w-36 text-center">Lisans Süresi</div>
              <div className="w-28 text-center">Fiyat</div>
              <div className="w-36 text-center">KDV Tutari</div>
              <div className="w-28 text-center">Total</div>
              <div className="w-28 text-center pr-2">İşlem</div>
            </div>
          </div>

          <main>
            {inData.map((data, index) => (
              <div
                key={index}
                className={`flex justify-between odd:bg-[--white-1] even:bg-[--table-odd] h-14 border-t last:border-b border-solid border-[--light-4] border-x-0 hover:bg-[--light-3] transition-colors relative group ${
                  totalItems < 8 ? "bg-[--red-1]" : "last:border-b-0"
                } `}
              >
                <div className="absolute -top-6 w-full flex justify-center text-sx invisible group-hover:visible">
                  <div className="bg-[--white-1] py-4 px-6 rounded-lg border border-solid border-[--light-1] relative min-w-72 max-w-[30rem]">
                    Açıklama: {data.description}
                    <ToolTip />
                  </div>
                </div>
                <div className="w-40 flex items-center">
                  <img
                    src={imageSRCs[data.marketplaceId]}
                    alt="MarketPlacePhoto"
                    className="w-40"
                  />
                </div>
                <div className="w-36 text-[--black-2] flex items-center justify-center">
                  {data.time} Yıllık
                </div>
                <div className="w-28 text-[--black-2] flex items-center justify-center">
                  {data.price}
                </div>
                <div className="w-36 text-[--black-2] flex items-center justify-center">
                  {KDV}%
                </div>
                <div className="w-28 text-[--black-2] flex items-center justify-center">
                  {
                    /* {data.price + (data.price / 100) * (checked ? KDV : 0)} */ data.totalPrice
                  }
                </div>
                <div className="w-28 text-[--black-2] flex items-center justify-center relative">
                  <LicensePackagesActions
                    index={index}
                    licensePackage={data}
                    itemsPerPage={totalItems}
                    onSuccess={onSuccess}
                  />
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </main>
  );
};

export default LicensePackagesTable;

function ToolTip() {
  return (
    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[--light-4]"></div>
  );
}
