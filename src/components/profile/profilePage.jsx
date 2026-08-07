//MOD
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import { cn } from "../../lib/utils";
import EditUserProfile from "./pages/editUserProfile";
import EditUserInvoice from "./pages/editUserInvoice";
import EditUserPassword from "./pages/editUserPassword";

//UTILS

//REDUX
import { getCities } from "../../redux/data/getCitiesSlice";
import { getUser, resetGetUserState } from "../../redux/user/getUserSlice";

//VAR
const tabs = ["Profili Düzenle", "Fatura Bilgileri", "Güvenlik"];

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { cities } = useSelector((state) => state.data.getCities);
  const { user, success } = useSelector((state) => state.user.getUser);
  const { success: addSuccess } = useSelector((state) => state.user.addInvoice);
  const { success: updateSuccess } = useSelector(
    (state) => state.user.updateInvoice
  );

  const [selected, setSelected] = useState(0);
  const [userData, setUserData] = useState(user);

  // GET THE USER
  useEffect(() => {
    if (!userData) {
      dispatch(getUser());
    }
  }, [userData]);

  // GET CITIES
  useEffect(() => {
    if (!cities) {
      dispatch(getCities());
    }
  }, [cities]);

  //SET USER AND INVOICE
  useEffect(() => {
    if (success) {
      setUserData(user);
      dispatch(resetGetUserState());
    }
  }, [user, success]);

  //RESET USER
  useEffect(() => {
    if (addSuccess || updateSuccess) setUserData(null);
  }, [addSuccess || updateSuccess]);

  return (
    // The header bar already titles the page "Profil", so no in-page <h2>.
    <section className="pt-20 sm:pt-[5.25rem] px-[4%] pb-4 flex flex-col min-h-dvh bg-[--white-1]">
      {/* Each tab carries its own active border instead of one sliding bar
          positioned by hand-measured translate-x values, which drifted the
          moment a label or breakpoint changed. -mb-px lays the active border
          over the nav's own rule. */}
      <nav className="w-full border-b border-solid border-[--border-1]">
        <ul className="flex gap-2 sm:gap-6">
          {tabs.map((tab, index) => (
            <li key={tab}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                className={cn(
                  "-mb-px border-b-2 px-2 pb-3 text-sm font-medium transition-colors",
                  selected === index
                    ? "border-[--primary-1] text-[--primary-1]"
                    : "border-transparent text-[--gr-1] hover:text-[--black-1]"
                )}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {selected === 0 ? (
        <EditUserProfile user={userData} cities={cities} />
      ) : selected === 1 ? (
        <EditUserInvoice user={userData} cities={cities} />
      ) : (
        selected === 2 && <EditUserPassword user={userData} />
      )}
    </section>
  );
};

export default ProfilePage;
