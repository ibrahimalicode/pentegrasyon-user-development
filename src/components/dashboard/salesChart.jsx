import CustomSelector from "../common/customSelector";
import TotalSales from "../../enums/totalSales";
import months from "../../enums/months";
import years from "../../enums/years";

const SalesChart = () => {
  const rates = ["100", "80", "60", "40", "20", "0"];

  function calc(price) {
    let max = 1;
    TotalSales.map((sales) => {
      sales.price > max ? (max = sales.price) : null;
    });

    const mainHeight = (100 / max) * price;
    const bgHeight =
      mainHeight +
      mainHeight * (mainHeight > 50 ? 0.15 : mainHeight > 25 ? 0.3 : 0.5);

    return {
      mainHeight,
      bgHeight,
      max,
    };
  }

  return (
    <main className="w-full px-2 sm:px-9 mt-1.5 bg-[--white-1] rounded-md border-2 border-solid border-[--light-1] max-md:overflow-x-scroll">
      <div className="flex flex-col gap-2.5 w-full min-w-[36rem]">
        <main className="flex w-full justify-between pt-6 z-[51] relative">
          <h2 className="text-2xl font-bold">Toplam Satış</h2>
          <div className="flex gap-3">
            <CustomSelector
              value={{ label: "Restoran" }}
              className2="mt-[0] sm:mt-[0]"
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
            />
            <CustomSelector
              value={{ label: "Yıl" }}
              options={years}
              className2="mt-[0] sm:mt-[0]"
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
            />
            <CustomSelector
              value={{ label: "Ay" }}
              options={months}
              className2="mt-[0] sm:mt-[0]"
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
            />
          </div>
        </main>

        <main className="w-full flex pt-6 relative">
          <div className="flex flex-col gap-6 text-[--gr-5] text-sm">
            {rates.map((rate, index) => (
              <p key={index} className={`${rate == "0" && "invisiblee"}`}>
                {rate}
              </p>
            ))}
          </div>

          <div className="flex z-50 w-full pt-2.5">
            {TotalSales.map((sales, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 items-center justify-end pl-4 w-[6rem]"
              >
                <div className="w-max h-full flex items-end relative group">
                  <div
                    className="w-[3.5rem] h-full bg-[--primary-1] rounded-xl z-50 relative lg:group-hover:scale-105 transition-all duration-300 ease-out"
                    style={{ maxHeight: `${calc(sales.price).mainHeight}%` }}
                  >
                    <div className="absolute -top-10 left-0 min-w-full flex justify-center opacity-0 group-hover:opacity-100 transition-all ease-in">
                      <ToolTip price={sales.price} />
                    </div>
                    <div className="absolute -top-6 left-0 right-0 min-w-full text-center group-hover:opacity-0">
                      {sales.price}
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-full bg-[--light-2] rounded-xl"
                    style={{ maxHeight: `${calc(sales.price).bgHeight}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 h-full w-full flex flex-col pt-[25px] gap-6 px-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-full flex items-center h-5 last:items-end"
              >
                <span
                  className={`w-full h-1 border-b`}
                  style={{
                    borderImage: `repeating-linear-gradient(to right, var(--gr-5), var(--gr-5), transparent 6px, transparent 10px) 1 / 1 / 0 stretch`,
                  }}
                ></span>
              </div>
            ))}
          </div>
        </main>

        <main className="flex  pl-8  w-max">
          {TotalSales.map((sales, index) => (
            <p
              key={index}
              className="w-[6rem] h-max py-2 text-[--gr-1] text-center whitespace-nowrap text-xs"
            >
              {sales.label}
            </p>
          ))}
        </main>
      </div>
    </main>
  );
};

export default SalesChart;

function ToolTip({ price }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="bg-[--primary-1] text-white text-sm font-bold px-2 py-1 rounded-md shadow-lg">
        {price}
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-[--primary-1]"></div>
      </div>
    </div>
  );
}
