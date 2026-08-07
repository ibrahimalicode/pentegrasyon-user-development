//MODULE
import { useRef } from "react";
import { useSelector } from "react-redux";

//COMP
import { TOOLBAR_BTN_PRIMARY } from "../../common/toolbarStyles";

//UTILS
import EditUserInvoiceById from "../../invoice/editUserInvoice";
import { useEditUserInvoice } from "@/hooks/useEditUserInvoice";

const EditUserInvoice = ({ user }) => {
  const dispatcher = useRef();
  const {
    cities,
    districts,
    neighs,
    userInvoice,
    setUserInvoice,
    handleSubmit,
  } = useEditUserInvoice(dispatcher, user);

  const { loading: addLoading } = useSelector((state) => state.user.addInvoice);
  const { loading: updateLoading } = useSelector(
    (state) => state.user.updateInvoice
  );

  return (
    <section className="w-full max-w-2xl pt-6 min-h-0">
      <form className="w-full" onSubmit={handleSubmit}>
        <EditUserInvoiceById
          cities={cities}
          districts={districts}
          neighs={neighs}
          userInvoice={userInvoice}
          setUserInvoice={setUserInvoice}
        />

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={addLoading || updateLoading}
            className={TOOLBAR_BTN_PRIMARY}
          >
            Kaydet
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditUserInvoice;
