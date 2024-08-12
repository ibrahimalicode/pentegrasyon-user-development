import { useState } from "react";
import EmailSection from "./emailSection";
import SMSSection from "./smsSection";
import CurrencySection from "./temp_currency";

const ParametersPage = () => {
  const tabs = ["Döviz Kuru", "E-Posta", "SMS"];
  const [selsected, setSelsected] = useState(0);
  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      <div className="w-full text-[--black-2] py-4 text-2xl font-bold">
        <h2>Parametreler</h2>
      </div>

      <nav className="flex flex-col items-start mt-5 w-full border-b border-[--border-1] max-w-[1050px]">
        <div className="flex flex-col max-w-full w-[376px]">
          <ul className="w-full flex gap-10 items-center px-4 text-base text-slate-500">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer ${
                  selsected === index ? "text-[--primary-1]" : ""
                }`}
                onClick={() => setSelsected(index)}
              >
                {tab}
              </li>
            ))}
          </ul>

          <div className="flex px-3 mt-2 w-full">
            <div
              className={`bg-[--primary-1] rounded-t-xl h-[3px] w-24 transition-transform duration-500 ease-in-out ${
                selsected === 1 && "translate-x-[7rem]"
              } ${selsected === 2 && "translate-x-[12.4rem]"}`}
            />
          </div>
        </div>
      </nav>
      {selsected === 0 ? (
        <CurrencySection />
      ) : selsected === 1 ? (
        <EmailSection />
      ) : (
        <SMSSection />
      )}
    </section>
  );
};

export default ParametersPage;
