import React, { useEffect, useState } from "react";
import CustomSelector from "../common/customSelector";

// Example usage with the provided data
const data = [
  { price: 12, percent: 80, color: "var(--green-1)" },
  { price: 4, percent: 15, color: "var(--primary-1)" },
  { price: 3, percent: 5, color: "var(--red-1)" },
];

const MarketplaceChart = () => {
  const maxPercent = Math.max(...data.map((item) => item.percent));
  const [segments, setSegments] = useState([]);
  const [colorSegments, setColorSegments] = useState(null);
  const [maxConicSegment, setMaxConicSegment] = useState(null);

  const getConicGradient = () => {
    let startAngle = 0;
    const colorSegments_ = data.map((item) => {
      const endAngle = startAngle + item.percent;
      const segment = `${item.color} ${startAngle}% ${endAngle}%`;

      if (item.percent === maxPercent) {
        setMaxConicSegment(
          `transparent 0% ${startAngle}%, ${item.color} ${startAngle}% ${endAngle}%, transparent ${endAngle}% 100%`
        );
      }

      setSegments((prev) => {
        return [...prev, `conic-gradient(${segment})`];
      });
      startAngle = endAngle;
      return segment;
    });
    return setColorSegments(`conic-gradient(${colorSegments_.join(", ")})`);
  };

  useEffect(() => {
    if (!colorSegments) {
      getConicGradient();
    }
  }, [colorSegments]);

  console.log(segments);

  return (
    <main className="max-md:w-full flex justify-center w-max bg-[--white-1] rounded-md border-2 border-solid border-[--light-1] max-md:pb-5">
      <div className="flex flex-col items-center justify-between pb-4 w-[20rem] max-md:w-full">
        <div className="w-full flex justify-between items-center py-3 px-2 max-md:mb-4">
          <h2 className="whitespace-nowrap text-xl font-bold pl-1">
            Pazar Yerı
          </h2>
          <CustomSelector
            value={{ label: "Getiryemek" }}
            className2="mt-[0] sm:mt-[0] scale-[.9] z-50 max-w-max"
            className="mt-[0] sm:mt-[0]"
            style={{
              borderRadius: ".7rem",
              fontSize: ".875rem",
              padding: "1px 0",
              backgroundColor: "var(--gr-4)",
              border: "none",
              fontWeight: "bold",
            }}
            singleValueStyle={{
              color: "#1e3a8a",
            }}
            isSearchable={false}
          />
        </div>

        <div className="relative flex items-center justify-center w-32 h-32">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: colorSegments,
            }}
          >
            <div className="relative">
              <div className="absolute bottom-0 left-0 p-1 bg-[--white-]">
                360
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 rounded-full z-30"
            style={{
              background: `conic-gradient(${maxConicSegment}`,
              transform: "scale(1.1)", // Slightly enlarges the segment
            }}
          >
            <div className="relative">
              <div className="absolute bottom-0 left-0 p-1 bg-[--white-]">
                360
              </div>
            </div>
          </div>
          <div className="absolute inset-5 bg-white rounded-full z-20"></div>
          <div className="absolute inset-6 bg-white rounded-full z-30 flex justify-center items-center">
            66
          </div>
        </div>
      </div>
    </main>
  );
};

export default MarketplaceChart;
