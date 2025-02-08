//MODULES
import { useEffect, useState } from "react";

//COMP
import CloseI from "../../../assets/icon/close";
import CustomInput from "../../common/customInput";
import { useSlideBar } from "../../../context/SlideBarContext";
import GetirYemekRestaurantsStatus from "../getirYemek/getirYemekRestaurantsStatus";
import MigrosYemekRestaurantsStatus from "../migrosYemek/migrosYemekRestaurantsStatus";
import YemekSepetiRestaurantsStatus from "../yemekSepeti/yemekSepetiRestaurantsStatus";

const RestaurantsStatusPopup = ({ inData }) => {
  const { setSlideBarContent } = useSlideBar();
  const [sections, setSections] = useState(
    new Array(4).fill("-translate-y-full opacity-0")
  );
  const [restaurantsData, setRestaurantsData] = useState(inData);

  const components = [
    { comp: GetirYemekRestaurantsStatus, id: 0 },
    { comp: MigrosYemekRestaurantsStatus, id: 1 },
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
    const searchData = inData.filter((D) =>
      D.name.toLocaleLowerCase().includes(e.toLocaleLowerCase())
    );
    setRestaurantsData(searchData);
  }

  return (
    <main className="w-full h-[100dvh] bg-[--white-1] pb-[4%] pt-2 rounded-md overflow-y-auto">
      <div className="flex justify-between mx-2 mb-2">
        <div className="w-full flex items-center max-w-80">
          <form className="w-full">
            <CustomInput
              onChange={(e) => {
                setSearchVal(e);
                handleSearch(e);
              }}
              value={searchVal}
              placeholder="Ara..."
              className2="mt-[0px] w-full"
              className="mt-[0px] py-[.5rem] w-[100%] focus:outline-none text-sm rounded-[9999px]"
              icon={
                searchVal ? (
                  <CloseI className="size-4 p-0.5 text-[--red-1] mr-2 border border-[--red-1] rounded-full" />
                ) : null
              }
              iconClick={clearSearch}
            />
          </form>
        </div>

        <button
          onClick={() => setSlideBarContent(null)}
          className="text-[--red-1] p-1.5  rounded-full"
        >
          <CloseI />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {components.map(({ comp: Comp, id }, i) => (
          <div
            key={id}
            className={`transition-all duration-700 transform ${sections[i]}`}
          >
            <Comp
              statRest={restaurantsData.filter(
                ({ marketplaceId }) => marketplaceId === id
              )}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default RestaurantsStatusPopup;
