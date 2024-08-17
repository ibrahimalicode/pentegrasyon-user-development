import React, { useState } from "react";
import MarketPalceIds from "../../../data/marketPlaceIds";
import CustomSelect from "../../common/customSelector";
import CustomTag from "../../common/customTag";
import Button from "../../common/button";
import CloseI from "../../../assets/icon/close";

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

  function clearFilter() {
    setMarketplaceData((prev) => {
      return [...prev, ...selectedMarketplaces];
    });
    setSelectedMarketplaces([]);
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between pr-[10%]">
        <div className="max-w-48">
          <CustomSelect
            value={{ label: "Pazaryeri Seç" }}
            options={marketplaceData}
            onChange={(selectedOption) => handleSelect(selectedOption)}
            className="mt-[0] sm:mt-[0]"
            className2="mt-[0] sm:mt-[0]"
          />
        </div>
        <Button
          text="Temizle"
          icon={<CloseI className="size-[15px]" />}
          className={`border-[var(--primary-1)] text-[var(--primary-1)] text-xs h-max py-[.4rem] self-end gap-1 ${
            selectedMarketplaces.length > 1 ? "visible" : "invisible"
          }`}
          onClick={clearFilter}
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
