import { AsteriskI } from "../../../assets/icon";
import mastercard_img from "../../../assets/img/card/Mastercard.png";
import chip_img from "../../../assets/img/card/chip.png";

function CardFront() {
  return (
    <main className="flip-card-front absolute flex flex-col w-full h-full px-5 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
      <header className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <p className="text-[--white-1] font-bold text-start">Kart</p>
          <div className="flex flex-col mt-3.5 w-full">
            <img
              loading="lazy"
              src={chip_img}
              alt="Card logo"
              className="object-contain aspect-[1.41] w-[55px]"
            />
          </div>
        </div>

        <div className="flex flex-col w-[67px]">
          <img
            loading="lazy"
            src={mastercard_img}
            alt="Card issuer logo"
            className="object-contain aspect-[1.68] w-[67px]"
          />
        </div>
      </header>

      <main className="flex flex-col justify-start mt-6 w-full text-[--light-1] ">
        <div className="flex justify-between">
          <span className="flex">
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
          </span>
          <span className="flex">
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
          </span>
          <span className="flex">
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
            <AsteriskI className="size-[17px]" />
          </span>
          <span className="flex text-[20px] -mt-1.5">
            <span>0</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
          </span>
        </div>

        <div className="flex justify-between w-full pt-1.5">
          <div className="w-full text-[14px] font-bold flex justify-start items-center">
            IBRAHIM ALI MOHAMMED
          </div>

          <div className="flex items-center">
            <div className="flex items-end  gap-2">
              <div className="flex flex-col text-[10px] font-bold">
                <div>VALID</div>
                <div>THRU</div>
              </div>

              <div className="flex items-end text-[25px] leading-6">
                <span className="flex">
                  <span>*</span>
                  <span>*</span>
                  <span className="text-[15px] -mt-[5px]">/</span>
                  <span>*</span>
                  <span>*</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}

export default CardFront;
