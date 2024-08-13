import { useState } from "react";
import EditProfile from "./pages/editProfile";

const ProfilePage = () => {
  const tabs = ["Profili Düzenle", "Tercihler", "Güvenlik"];
  const [selsected, setSelsected] = useState(0);
  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      <div className="w-full text-[--black-2] py-4 text-2xl font-bold">
        <h2>Profil</h2>
      </div>

      <nav className="flex flex-col items-start mt-5 w-full border-b border-[--border-1] max-w-[1050px]">
        <div className="flex flex-col w-max">
          <ul className="w-full flex gap-10 items-center px-4 text-base text-slate-500">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer w-28 ${
                  selsected === index ? "text-[--primary-1]" : ""
                }`}
                onClick={() => setSelsected(index)}
              >
                {tab}
              </li>
            ))}
          </ul>

          <div className="flex mt-2 w-full">
            <div
              className={`bg-[--primary-1] rounded-t-xl h-[3px] w-[8.6rem] transition-transform duration-500 ease-in-out ${
                selsected === 1 && "translate-x-[8.3rem]"
              } ${selsected === 2 && "translate-x-[17.7rem]"}`}
            />
          </div>
        </div>
      </nav>
      {selsected === 0 ? <EditProfile /> : selsected === 1 ? "" : ""}
    </section>
  );
};

export default ProfilePage;
