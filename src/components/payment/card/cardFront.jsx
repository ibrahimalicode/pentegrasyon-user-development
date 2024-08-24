import React from "react";
import { AsteriskI } from "../../../assets/icon";
import mastercard_img from "../../../assets/img/card/Mastercard.png";
import chip_img from "../../../assets/img/card/chip.png";

function CardFront({ cardData }) {
  const { userName, cardNumber, month, year, cvv } = cardData;

  const cleanNumber = cardNumber.replace(/\D/g, "");
  // Format the card number into groups of 4 digits
  const firstFour = cleanNumber.slice(0, 4).split("");
  const secondFour = cleanNumber.slice(4, 8).split("");
  const thirdFour = cleanNumber.slice(8, 12).split("");
  const lastFour = cleanNumber.slice(12).split("");

  function showNum(array, secondArray, index) {
    // return index === array.length - 1 && !secondArray.length;
    return !secondArray.length;
  }
  return (
    <main className="flip-card-front absolute flex flex-col w-full h-full px-5 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl">
      <header className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <p className="text-[--white-1] font-bold text-start">Kredi Kartı</p>
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
        <div className="flex mb-3 items-center leading-[15px]">
          {cardNumber ? (
            <>
              {firstFour.length > 0 && (
                <span className="flex w-16 mr-3.5">
                  {firstFour.map((num, i) => (
                    <React.Fragment key={i}>
                      {showNum(firstFour, secondFour, i) ? (
                        <span>{num}</span>
                      ) : (
                        <AsteriskI className="size-[15px]" />
                      )}
                    </React.Fragment>
                  ))}
                </span>
              )}
              {secondFour.length > 0 && (
                <span className="flex w-16 mr-3.5">
                  {secondFour.map((num, i) => (
                    <React.Fragment key={i}>
                      {showNum(secondFour, thirdFour, i) ? (
                        <span>{num}</span>
                      ) : (
                        <AsteriskI className="size-[15px]" />
                      )}
                    </React.Fragment>
                  ))}
                </span>
              )}
              {thirdFour.length > 0 && (
                <span className="flex w-16 mr-3.5">
                  {thirdFour.map((num, i) => (
                    <React.Fragment key={i}>
                      {showNum(thirdFour, lastFour, i) ? (
                        <span>{num}</span>
                      ) : (
                        <AsteriskI className="size-[15px]" />
                      )}
                    </React.Fragment>
                  ))}
                </span>
              )}
              {lastFour.length > 0 && (
                <span className="flex w-max">
                  {lastFour.map((num, index) => (
                    <React.Fragment key={index}>
                      <span>{num}</span>
                    </React.Fragment>
                  ))}
                </span>
              )}
            </>
          ) : (
            <Asterisks />
          )}
        </div>

        <div className="flex justify-between w-full pt-1.5">
          <div className="w-full text-[14px] font-bold flex justify-start items-center">
            {userName ? userName.toUpperCase() : "KART SAHIBI"}
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="flex flex-col text-[7px] font-bold leading-3">
                <div>VALID</div>
                <div>THRU</div>
              </div>

              <div className="flex items-center leading-6">
                <div className="flex items-center text-xs">
                  <span className="min-w-[24px]">
                    {month ? (
                      month
                    ) : (
                      <span className="flex">
                        <AsteriskI className="size-[10px]" />
                        <AsteriskI className="size-[10px]" />
                      </span>
                    )}
                  </span>
                  <span className="text-sm">/</span>
                  <span className="min-w-[24px]">
                    {year ? (
                      year
                    ) : (
                      <span className="flex">
                        <AsteriskI className="size-[10px]" />
                        <AsteriskI className="size-[10px]" />
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}

export default CardFront;

function Asterisks() {
  return (
    <>
      <span className="flex mr-3.5">
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
      </span>
      <span className="flex mr-3.5">
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
      </span>
      <span className="flex mr-3.5">
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
      </span>
      <span className="flex ">
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
        <AsteriskI className="size-[15px]" />
      </span>
    </>
  );
}
