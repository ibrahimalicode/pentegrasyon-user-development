//MODULES
import { useEffect, useState } from "react";

//COMP
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import { useSlideBar } from "../../../context/SlideBarContext";
import GetirYemekRestaurantsStatus from "../getirYemek/getirYemekRestaurantsStatus";
import MigrosYemekRestaurantsStatus from "../migrosYemek/migrosYemekRestaurantsStatus";
import YemekSepetiRestaurantsStatus from "../yemekSepeti/yemekSepetiRestaurantsStatus";
import TrendyolYemekRestaurantsStatus from "../trendyolYemek/trendyolYemekRestaurantsStatus";

const RestaurantsStatusPopup = ({ licenses, inData, onSuccess }) => {
  const { setSlideBarContent } = useSlideBar();
  const [sections, setSections] = useState(
    new Array(4).fill("-translate-y-full opacity-0")
  );
  const [restaurantsData, setRestaurantsData] = useState(inData);

  const components = [
    { comp: GetirYemekRestaurantsStatus, id: 0 },
    { comp: MigrosYemekRestaurantsStatus, id: 1 },
    { comp: TrendyolYemekRestaurantsStatus, id: 2 },
    { comp: YemekSepetiRestaurantsStatus, id: 3 },
  ].filter(({ id }) =>
    restaurantsData.some(({ marketplaceId }) => marketplaceId === id)
  );

  // ANIMATION EFFECT
  useEffect(() => {
    const cls = "translate-y-0 opacity-100";
    const timeouts = components.map((_, index) =>
      setTimeout(() => {
        setSections((prev) => prev.map((s, i) => (i === index ? cls : s)));
      }, (index + 1) * 250)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [components.length]);

  const [searchVal, setSearchVal] = useState("");

  function clearSearch() {
    setSearchVal("");
    setRestaurantsData(inData);
  }

  function handleSearch(e) {
    if (!e) {
      clearSearch();
      return;
    }
    const searchData = inData.filter((D) => {
      return D?.name
        ? D.name.toLocaleLowerCase().includes(e.toLocaleLowerCase())
        : D?.storeName.toLocaleLowerCase().includes(e.toLocaleLowerCase());
    });
    setRestaurantsData(searchData);
  }

  return (
    // Column layout: the header and search stay put while only the card list
    // scrolls, so the close button is always reachable in a tall panel.
    <main className="w-full h-[100dvh] bg-[--white-1] flex flex-col">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-solid border-[--border-1] px-4 py-3">
        <h2 className="text-base font-semibold text-[--black-1]">
          Restoran Durumları
        </h2>
        <button
          type="button"
          aria-label="Kapat"
          onClick={() => setSlideBarContent(null)}
          className="flex size-8 items-center justify-center rounded-lg text-[--gr-1] transition-colors hover:bg-[--light-3] hover:text-[--black-1]"
        >
          <CloseI className="size-5" />
        </button>
      </header>

      <div className="shrink-0 px-4 pt-3">
        <CustomInput
          onChange={(e) => {
            setSearchVal(e);
            handleSearch(e);
          }}
          value={searchVal}
          placeholder="Restoran ara..."
          iconClick={clearSearch}
          className2="mt-0 sm:mt-0 w-full max-w-sm"
          className="mt-0 sm:mt-0"
          icon={
            searchVal ? <CloseI className="size-4 text-[--gr-1]" /> : null
          }
        />
      </div>

      {/* max-w keeps the rows readable instead of stretching a two-control
          row across the full width of a 90% panel. */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="flex max-w-3xl flex-col gap-3">
          {components.map(({ comp: Comp, id }, i) => (
            <div
              key={id}
              className={`transition-all duration-700 transform text-[--black-1] ${sections[i]}`}
            >
              <Comp
                onSuccess={onSuccess}
                licenses={licenses.filter(
                  ({ licenseTypeId }) => licenseTypeId === id
                )}
                statRest={restaurantsData.filter(
                  ({ marketplaceId }) => marketplaceId === id
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RestaurantsStatusPopup;
