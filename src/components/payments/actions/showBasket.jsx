//MODULES

//CONTEXT
import { usePopup } from "../../../context/PopupContext";

//COMP
import ActionButton from "../../common/actionButton";
import { CancelI, EyeI } from "../../../assets/icon";

//UTILS

const ShowBasket = ({ payment }) => {
  const { setPopupContent } = usePopup();
  const handleClick = () => {
    setPopupContent(<ShowBasketPopup payment={payment} />);
  };

  return (
    <ActionButton
      element={<EyeI className="w-5" strokeWidth="1.8" />}
      element2="Basket"
      onClick={handleClick}
    />
  );
};

export default ShowBasket;

//
///
function ShowBasketPopup({ payment }) {
  const { setPopupContent } = usePopup();
  console.log(payment);

  return (
    <main>
      <div className="w-full pt-12 px-[4%] pb-8 bg-[--white-1] rounded-lg border-2 border-solid border-[--border-1] text-[--black-2] max-w-2xl">
        <div className="flex flex-col bg-[--white-1] relative">
          <div className="absolute -top-6 right-0">
            <div
              className="text-[--primary-2] p-2 border border-solid border-[--primary-2] rounded-full cursor-pointer hover:bg-[--primary-2] hover:text-[--white-1] transition-colors"
              onClick={() => setPopupContent(false)}
            >
              <CancelI />
            </div>
          </div>
          <h1 className="self-center text-2xl font-bold">Basket</h1>
        </div>
      </div>
    </main>
  );
}
