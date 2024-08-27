//MOD
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import EditProfile from "./pages/editProfile";
import EditUserInvoice from "./pages/editUserInvoice";

//REDUX
import { getUser } from "../../redux/user/getUserSlice";
import { getCities } from "../../redux/data/getCitiesSlice";
import { getAuth } from "../../redux/api";
import EditUserPassword from "./pages/editUserPassword";
import EditAdminPassword from "./pages/editAdminPassword";

//VAR
const tabs = ["Profili Düzenle", "Fatura Bilgileri", "Güvenlik"];

const ProfilePage = () => {
  const localUser = getAuth();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.getUser);
  const { cities } = useSelector((state) => state.data.getCities);

  const [selected, setSelected] = useState(0);
  const [userData, setUserData] = useState(null);

  // GET THE USER
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    } else {
      setUserData(user);
    }
  }, [user]);

  // GET CITIES
  useEffect(() => {
    if (!cities) {
      dispatch(getCities());
    }
  }, [cities]);

  return (
    <section className="lg:ml-[280px] pt-16 sm:pt-16 px-[4%] pb-4 grid grid-cols-1 section_row">
      <div className="w-full text-[--black-2] py-4 text-2xl font-bold">
        <h2>Profil</h2>
      </div>

      <nav className="flex flex-col items-start mt-5 w-full border-b border-[--border-1] max-w-[1050px]">
        <div className="flex flex-col w-max">
          <ul className="w-full flex gap-10 max-sm:gap-4 items-center px-4 text-base text-slate-500">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer w-32 ${
                  selected === index ? "text-[--primary-1]" : ""
                }`}
                onClick={() => setSelected(index)}
              >
                {tab}
              </li>
            ))}
          </ul>

          <div className="flex mt-2 w-full">
            <div
              className={`bg-[--primary-1] rounded-t-xl h-[3px] w-[8.6rem] transition-transform duration-500 ease-in-out ${
                selected === 1 && "translate-x-[9rem] sm:translate-x-[10.7rem]"
              } ${
                selected === 2 &&
                "translate-x-[17.7rem] sm:translate-x-[20.7rem] w-[7rem]"
              }`}
            />
          </div>
        </div>
      </nav>

      {selected === 0 ? (
        <EditProfile user={userData} cities={cities} />
      ) : selected === 1 ? (
        <EditUserInvoice user={userData} cities={cities} />
      ) : (
        selected === 2 &&
        (localUser?.isManager ? <EditAdminPassword /> : <EditUserPassword />)
      )}
    </section>
  );
};

export default ProfilePage;
