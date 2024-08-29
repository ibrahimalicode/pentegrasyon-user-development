//MODULES
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";

//HOOKS
import { useEditUserInvoiceById } from "../../../../../hooks/useEditUserInvoiceById";

//REDUX
import EditUserInvoiceById from "../../../invoice/editUserInvoiceById";

const InvoiceData = ({ user, submit, title, userInvData, userData }) => {
  const dispatcher = useRef();
  const [openFatura, setOpenFatura] = useState(false);

  const {
    cities,
    districts,
    neighs,
    userInvoice,
    userInvoiceBefore,
    setUserInvoice,
    handleSubmit,
  } = useEditUserInvoiceById(dispatcher, user);

  useEffect(() => {
    const equalInv = isEqual(userInvoice, userInvoiceBefore);
    if (submit && !equalInv) {
      handleSubmit();
    }
  }, [submit]);

  return (
    <div className="text-xs pt-2 w-full flex flex-col items-center pb-8">
      <span className="w-full text-[--red-1]">{title}</span>
      {userInvData && !openFatura ? (
        <div className="w-full flex items-end">
          <div>
            {userData && userData.fullName}, {userInvData && userInvData.title}
            <p className="pt-1">{userInvData.taxNumber},</p>
            <p>{userInvData.taxOffice},</p>
            <p>
              {userInvData.tradeRegistryNumber &&
                userInvData.tradeRegistryNumber}
              ,
            </p>
            <p>{userInvData.mersisNumber && userInvData.mersisNumber}</p>
            <p>
              {userInvData.address}/{userInvData.city}/{userInvData.district}/
              {userInvData.neighbourhood}
            </p>
          </div>

          <div className="h-full flex justify-end">
            <button
              type="button"
              onClick={() => setOpenFatura(true)}
              className="border border-[--border-1] py-1.5 px-1 text-[--black-2] rounded-sm hover:text-[--black-1] hover:bg-[--light-3]"
            >
              Düzenle
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-lg">
          <EditUserInvoiceById
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
