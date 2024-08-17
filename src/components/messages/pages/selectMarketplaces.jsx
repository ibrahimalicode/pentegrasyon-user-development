import React, { useState } from "react";
import MarketPalceIds from "../../../data/marketPlaceIds";
import CustomSelect from "../../common/customSelector";
import CustomTag from "../../common/customTag";

const SelectMarketplaces = ({
  selectedMarketplaces,
  setSelectedMarketplaces,
}) => {
  const allOption = { label: "Bütün Pazaryeri", value: true, id: -1 };
  const [marketplaceData, setMarketplaceData] = useState([
    allOption,
    ...MarketPalceIds,
  ]);

  function handleSelect(selectedOption) {
    if (selectedOption.id === -1) {
      setSelectedMarketplaces(MarketPalceIds);
      setMarketplaceData([allOption]);
      return;
    }
    setSelectedMarketplaces((prev) => {
      return [...prev, selectedOption];
    });
    const unselectedOnes = marketplaceData.filter(
      (marketplace) => marketplace.id !== selectedOption.id
    );
    setMarketplaceData(unselectedOnes);
  }

  function handleUnselect(marketplace) {
    const marketplaces = selectedMarketplaces.filter(
      (selected) => selected.id !== marketplace.id
    );
    setSelectedMarketplaces(marketplaces);
    setMarketplaceData((prev) => {
      return [...prev, marketplace];
    });
  }

  return (
    <div className="w-full">
      <div className="max-w-48">
        <CustomSelect
          value={{ label: "Pazaryeri Seç" }}
          options={marketplaceData}
          onChange={(selectedOption) => handleSelect(selectedOption)}
          className="mt-[0] sm:mt-[0]"
          className2="mt-[0] sm:mt-[0]"
        />
      </div>
      <div className="w-[90%] h-[1px] bg-[--border-1] mt-2"></div>
      <div className="pt-4 pl-2 flex flex-wrap gap-2">
        {selectedMarketplaces?.length > 0 &&
          selectedMarketplaces.map((marketplace) => (
            <React.Fragment key={marketplace.id}>
              <CustomTag
                data={marketplace}
                onClick={() => handleUnselect(marketplace)}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default SelectMarketplaces;
