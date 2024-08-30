//MODULES
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";

//HOOKS
import { useEditUserInvoiceById } from "../../../../hooks/useEditUserInvoiceById";

//REDUX
import EditUserInvoiceById from "../../invoice/editUserInvoiceById";

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
      <div className="w-full flex flex-col items-center">
        <span className="text-[--red-1]">{title}</span>
        {userInvData && !openFatura && (
          <div className="h-full flex justify-end">
            <button
              type="button"
              onClick={() => setOpenFatura(true)}
              className="p-2 mt-3 bg-[--primary-2] text-[--white-1] rounded-md hover:text-[--primary-2] hover:bg-[--white-1] transition-colors duration-300 ease-in-out border border-[--primary-2]"
            >
              Düzenle
            </button>
          </div>
        )}
      </div>

      {userInvData && !openFatura ? (
        <div className="w-[325px] flex justify-start mt-4">
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
        </div>
      ) : (
        <div className="w-full px-4">
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
