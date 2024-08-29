// import Lottie from "lottie-react";
// import checkAnim from "../assets/anim/lottie/check_anim.json";
// import congraAnim from "../assets/anim/lottie/congra_anim.json";
// import { useEffect, useState } from "react";
// import { usePopup } from "../context/PopupContext";
// import TypingEffect from "../components/common/typingEffect";

const PaymentSuccess = () => {
  // Notify the parent window that the success page has loaded
  window.parent.postMessage({ status: "success" }, "*");

  return null;
};

export default PaymentSuccess;

// <section
//   id="payment_success-123"
//   className="min-h-0 flex justify-center items-start"
// >
//   <div className="w-[325px] overflow-visible relative">
//     <div className="w-full h-full bg-[--white-1] flex justify-center items-center relative overflow-visible">
//       <div className="absolute w-full h-full top-0 left-0">
//         {playAnimation && (
//           <Lottie animationData={congraAnim} loop={false} />
//         )}
//       </div>
//       <div className="w-60">
//         <Lottie animationData={checkAnim} loop={false} />
//       </div>
//     </div>
//     <div className="flex w-full justify-center">
//       <div className="text-[--green-1] text-xl mt-10 w-60">
//         <TypingEffect
//           text="Ödeme işleminiz başarlı."
//           speed={40}
//           delay={4000}
//         />
//       </div>
//     </div>
//   </div>
// </section>
