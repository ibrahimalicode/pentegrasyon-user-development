//MODULES
import { useEffect, useRef, useState } from "react";

//HOOKS
import { useEditUserInvoice } from "../../../../hooks/useEditUserInvoice";

//REDUX
import EditUserInvoice from "../../invoice/editUserInvoice";
import { useSelector } from "react-redux";

const InvoiceData = ({
  user,
  onSubmit,
  title,
  userInvData,
  setUserInvData,
  userData,
  openFatura,
  setOpenFatura,
  setInvoiceBeforeAfter,
}) => {
  const dispatcher = useRef();
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
  } = useEditUserInvoice(dispatcher, user);

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
    }
  }, [addInvError, updateInvError, addInvSucc, updateInvSucc]);

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
