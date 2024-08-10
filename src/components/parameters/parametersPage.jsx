import CurrencySection from "./CurrencySection";

const ParametersPage = () => {
  const tabs = ["Döviz Kuru", "E-Posta", "SMS"];
  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      <div className="w-full text-[--black-2] py-4 text-2xl font-bold">
        <h2>Parametreler</h2>
      </div>

      <nav className="flex flex-col items-start mt-5 max-w-full border-b border-slate-200 w-[1050px] max-md:pr-5">
        <div className="flex flex-col max-w-full w-[376px]">
          <ul className="flex gap-10 items-center px-6 w-full text-base text-slate-500 max-md:px-5">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`self-stretch my-auto ${
                  index === 0 ? "text-indigo-600" : ""
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start px-1.5 mt-2 max-w-full w-[200px] max-md:pr-5">
            <div className="flex shrink-0 bg-indigo-600 rounded-xl h-[3px] w-[114px]" />
          </div>
        </div>
      </nav>
      <CurrencySection />
    </section>
  );
};

export default ParametersPage;
