import { useLocation } from "react-router-dom";
import NotFound from "./404";
// import failed_card from "../assets/img/failed_card.png";

const PaymentFailed = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const unAuthorized = currentPath == "/payment-failed";
  window.parent.postMessage({ status: "failed" }, "*");

  return unAuthorized && <NotFound />;
};

export default PaymentFailed;

// <section className="min-h-0 flex flex-col justify-start items-center pt-24">
//   <div className="w-[25rem] overflow-visible">
//     <img src={failed_card} alt="failed_card" />
//   </div>

//   <div className="pt-8 text-center">
//     <p className="text-3xl mb-4 text-[--black-2]">Ödeme Başarısız !</p>
//     <p className="text-[--gr-1]">
//       İşleminiz teknik bir hata nedeniyle başarısız oldu. Lütfen tekrar
//       deneyin.
//     </p>
//   </div>

//   <div className="w-full flex justify-center pt-14">
//     <button className="flex items-center py-2.5 whitespace-nowrap px-4 rounded-md text-sm border-[1.5px] disabled:cursor-not-allowed justify-center text-[--white-1] bg-[--primary-1] border-[--primary-1] group border-none">
//       Geri dön
//     </button>
//   </div>
// </section>
