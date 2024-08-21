import { AsteriskI } from "../../../assets/icon";
import mastercard_img from "../../../assets/img/card/Mastercard.png";

const CardBack = () => {
  return (
    <main className="flip-card-back  absolute w-full h-full py-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl text-[--light-1]">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full h-12 bg-[--gr-3] px-4"></div>

        <div className="flex justify-between px-4">
          <div className="flex justify-end items-center relative">
            <AsteriskI />
            <AsteriskI />
            <AsteriskI />
            <span className="absolute -top-3 left-0 text-xs">CVV</span>
          </div>
          <img src={mastercard_img} alt="card" />
        </div>
      </div>
    </main>
  );
};

export default CardBack;
