import { useState } from "react";
import SelectUsers from "./selectUsers";
import SelectMarketplaces from "./selectMarketplaces";
import SearchUsers from "./searchUsers";
import SelectPlatform from "./selectPlatform";
import SelectRol from "./selectRol";
import MessageForm from "./messageForm";
import Button from "../../common/button";
import SendI from "../../../assets/icon/send";

const MessagesPage = () => {
  const [users, setUsers] = useState([]);
  const [marketplaces, setMarketplaces] = useState([]);
  const [platforms, setPlatforms] = useState({
    SMS: false,
    email: false,
    desktop: false,
  });
  const [roles, setRoles] = useState({
    dealer: false,
    user: false,
    admin: false,
  });
  const [message, setMessage] = useState({
    header: "",
    body: "",
  });

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      {/* TITLE */}
      <div className="w-full text-[--black-2] py-4 text-2xl font-semibold">
        <h2>Mesajlar</h2>
      </div>

      <main className="w-full">
        <SearchUsers />
        <div className="w-full flex max-xl:flex-col max-xl:gap-8 pt-6">
          <SelectUsers selectedUsers={users} setSelectedUsers={setUsers} />
          <SelectMarketplaces
            selectedMarketplaces={marketplaces}
            setSelectedMarketplaces={setMarketplaces}
          />
          <div className="max-sm:w-full">
            <SelectPlatform platforms={platforms} setPlatforms={setPlatforms} />
            <SelectRol roles={roles} setRoles={setRoles} />
          </div>
        </div>

        <MessageForm message={message} setMessage={setMessage} />
        <div className="w-full flex justify-end pt-4">
          <Button
            text="Gönder"
            icon={<SendIcon />}
            className="bg-[--primary-1] text-[--white-1] text-[16px] border-none py-3.5 flex items-center group"
          />
        </div>
      </main>
    </section>
  );
};

export default MessagesPage;

function SendIcon() {
  return (
    <div className="-rotate-[30deg] px-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 ease-in-out">
      <SendI />
    </div>
  );
}
