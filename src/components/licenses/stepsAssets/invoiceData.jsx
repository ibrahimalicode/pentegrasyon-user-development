//MODULES
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//HOOKS
import { useEditUserInvoice } from "@/hooks/useEditUserInvoice";

//COMP
import EditUserInvoice from "../../invoice/editUserInvoice";

//REDUX
import { getUser } from "../../../redux/user/getUserSlice";

const InvoiceData = ({
  title,
  onSubmit,
  userData,
  openFatura,
  userInvData,
  setOpenFatura,
  setUserInvData,
  setInvoiceBeforeAfter,
}) => {
  const dispatcher = useRef();
  const dispatch = useDispatch();
  const { error: updateInvError, success: updateInvSucc } = useSelector(
    (state) => state.user.updateInvoice
  );

  const { error: addInvError, success: addInvSucc } = useSelector(
    (state) => state.user.addInvoice
  );

  const {
    cities,
    districts,
    neighs,
    userInvoice,
    setUserInvoice,
    userInvoiceBefore,
    handleSubmit,
  } = useEditUserInvoice(dispatcher, userData);

  useEffect(() => {
    if (userInvData) {
      const city = userInvoice.city?.label;
      const district = userInvoice.district?.label;
      const neighbourhood = userInvoice.neighbourhood?.label;
      setUserInvData({ ...userInvoice, city, district, neighbourhood });
    } else {
      setOpenFatura(true);
    }

    setInvoiceBeforeAfter({ userInvoice, userInvoiceBefore });
    onSubmit(handleSubmit);
  }, [userInvoice]);

  //ADD OR UPDATE USER INV
  useEffect(() => {
    if (updateInvSucc) {
      setOpenFatura(false);
    }
    if (addInvSucc) {
      setOpenFatura(false);
      const city = userInvoice.city?.label;
      const district = userInvoice.district?.label;
      const neighbourhood = userInvoice.neighbourhood?.label;
      setUserInvData({ ...userInvoice, city, district, neighbourhood });
      dispatch(getUser());
    }
  }, [addInvError, updateInvError, addInvSucc, updateInvSucc]);

  // Only non-empty fields render — the old summary printed stray commas
  // for every blank value.
  const summaryLines = userInvData
    ? [
        [userData?.fullName, userInvData.title].filter(Boolean).join(" — "),
        userInvData.taxNumber && `VKN/TCKN: ${userInvData.taxNumber}`,
        userInvData.taxOffice && `Vergi Dairesi: ${userInvData.taxOffice}`,
        userInvData.tradeRegistryNumber &&
          `Ticaret Sicil No: ${userInvData.tradeRegistryNumber}`,
        userInvData.mersisNumber && `Mersis No: ${userInvData.mersisNumber}`,
        [
          userInvData.address,
          userInvData.neighbourhood,
          userInvData.district,
          userInvData.city,
        ]
          .filter(Boolean)
          .join(", "),
      ].filter(Boolean)
    : [];

  return (
    <div className="text-xs pt-2 w-full flex flex-col items-center pb-8">
      {/* Informational, not an error — the old red text read as a warning. */}
      <span className="px-4 text-center text-[--gr-1]">{title}</span>

      {userInvData && !openFatura ? (
        <div className="mt-3 w-full max-w-sm rounded-lg border border-solid border-[--border-1] bg-[--white-1] px-3 py-2.5 text-left">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 text-[--black-2]">
              {summaryLines.map((line, i) => (
                <p key={i} className={i === 0 ? "font-medium text-[--black-1]" : "pt-0.5"}>
                  {line}
                </p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpenFatura(true)}
              className="shrink-0 rounded-lg border border-solid border-[--border-1] px-2.5 py-1 text-xs text-[--black-2] transition-colors hover:border-[--primary-1] hover:text-[--primary-1]"
            >
              Düzenle
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full px-4">
          <EditUserInvoice
            cities={cities ? cities : []}
            districts={districts}
            neighs={neighs}
            userInvoice={userInvoice}
            setUserInvoice={setUserInvoice}
          />
        </div>
      )}
    </div>
  );
};

export default InvoiceData;
