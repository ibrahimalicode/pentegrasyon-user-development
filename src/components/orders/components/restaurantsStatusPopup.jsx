//MODULES
import { useEffect, useState } from "react";

//COMP
import CloseI from "../../../assets/icon/close";
import { usePopup } from "../../../context/PopupContext";
import GetirYemekRestaurantsStatus from "../getirYemek/getirYemekRestaurantsStatus";
import MigrosYemekRestaurantsStatus from "../migrosYemek/migrosYemekRestaurantsStatus";
import YemekSepetiRestaurantsStatus from "../yemekSepeti/yemekSepetiRestaurantsStatus";

const RestaurantsStatusPopup = ({ inData }) => {
  const { setPopupContent } = usePopup();
  const [sections, setSections] = useState(
    new Array(4).fill("-translate-y-full opacity-0")
  );

  const components = [
    { comp: GetirYemekRestaurantsStatus, id: 0 },
    { comp: MigrosYemekRestaurantsStatus, id: 1 },
    { comp: YemekSepetiRestaurantsStatus, id: 3 },
  ].filter(({ id }) =>
    inData.some(({ marketplaceId }) => marketplaceId === id)
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

  return (
    <main className="w-full bg-[--white-1] pb-[4%] pt-2 rounded-md">
      <div className="flex justify-end">
        <button
          onClick={() => setPopupContent(null)}
          className="text-[--red-1] border border-[--red-1] p-1.5 mr-2 mb-2 rounded-full"
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
              statRest={inData.filter(
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
