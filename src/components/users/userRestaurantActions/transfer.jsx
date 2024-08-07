import { CancelI, TransferI } from "../../../assets/icon";
import { usePopup } from "../../../context/PopupContext";

const TransferRestaurant = ({ restaurantsData, onSuccess }) => {
  const { setShowPopup, setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(
      <TransferRestaurantPopup
        restaurantsData={restaurantsData}
        onSuccess={onSuccess}
      />
    );
    setShowPopup(true);
  };

  return (
    <button
      className="w-full flex items-center gap-2 py-2 pl-6 text-left border-b border-solid border-[--border-1] cursor-pointer"
      onClick={handleClick}
    >
      <TransferI className="w-5" strokeWidth="1.8" /> Transfer
    </button>
  );
};

export default TransferRestaurant;

function TransferRestaurantPopup({ restaurantsData, onSuccess }) {
  const { setShowPopup, setPopupContent } = usePopup();

  const closeForm = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSubmitPass({ status: false, submit: true });
  };
  return (
    <div className=" w-full pt-12 pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] text-base max-h-[90dvh] overflow-y-scroll relative">
      {/* {(getUserLoading || getUserError || updateUserState.loading) && (
      <div className="flex justify-center items-center absolute top-24 bottom-0 left-0 right-0 bg-slate-950/[.01]  z-10">
        <div className="pb-72">
          <LoadingI2 className="rounded-full scale-150" />
        </div>
      </div>
    )} */}
      <div className="flex flex-col bg-[--white-1] relative">
        <div className="absolute -top-6 right-3 z-[50]">
          <div
            className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
            onClick={closeForm}
          >
            <CancelI />
          </div>
        </div>

        <h1 className="self-center text-2xl font-bold">Restoran Transfer</h1>
        <div className="flex flex-col px-4 sm:px-14 mt-9 w-full text-left">
          <form onSubmit={handleSubmit}></form>
        </div>
      </div>
    </div>
  );
}
