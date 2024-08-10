import MenuI from "../../assets/icon/menu";
import Getiryemek from "../../assets/img/packages/Getiryemek.png";
import MigrosYemek from "../../assets/img/packages/MigrosYemek.png";
import Siparisim from "../../assets/img/packages/Siparisim.png";
import TrendyolYemek from "../../assets/img/packages/TrendyolYemek.png";
import GoFody from "../../assets/img/packages/GoFody.png";
import Yemeksepeti from "../../assets/img/packages/Yemeksepeti.png";
import licensePackages from "../../data/licensePackages";

const LicensePackagesTable = ({
  inData,
  Actions,
  totalItems = licensePackages.length,
  onSuccess,
}) => {
  const imageSRCs = [
    Getiryemek,
    MigrosYemek,
    Siparisim,
    TrendyolYemek,
    GoFody,
    Yemeksepeti,
  ];

  console.log(licensePackages.length);
  return (
    <main className="max-xl:overflow-x-scroll">
      <div className="min-h-[30rem] border border-solid border-[--light-4] rounded-lg min-w-[50rem] overflow-hidden">
        <div className="w-full text-sm font-light">
          <div className="w-full">
            <div className="flex items-center justify-between bg-[--light-3] h-8">
              <div className="w-40">Pazaryeri</div>
              <div className="w-36">Lisans Süresi</div>
              <div>Fiyat</div>
              <div>KDV Tutari</div>
              <div>Total</div>
              <div className="text-center pr-2">İşlem</div>
            </div>
          </div>

          <main>
            {licensePackages.map((data, index) => (
              <div
                key={index}
                className={`flex justify-between odd:bg-[--white-1] even:bg-[--table-odd] h-14 border-t last:border-b border-solid border-[--light-4] border-x-0 ${
                  totalItems < 8 ? "bg-[--red-1]" : "last:border-b-0"
                } `}
              >
                <div className="w-max">
                  <img
                    src={imageSRCs[data.marketplaceId]}
                    alt="MarketPlacePhoto"
                    className="w-40"
                  />
                </div>
                <div className="w-max text-[--black-2] font-light first:font-normal">
                  {data.time}
                </div>
                <div className="w-max text-[--black-2] font-light first:font-normal">
                  {data.price}
                </div>
                <div className="w-max text-[--black-2] font-light first:font-normal">
                  20%
                </div>
                <div className="w-max text-[--black-2] font-light first:font-normal">
                  120
                </div>
                <div className="w-max text-[--black-2] relative">
                  <MenuI />
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
