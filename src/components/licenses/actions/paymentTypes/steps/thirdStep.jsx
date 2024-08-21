import Lottie from "lottie-react";
import { useEffect, useState } from "react";
// ANIMATIONS
import checkAnim from "../../../../../assets/anim/lottie/check_anim.json";
import congraAnim from "../../../../../assets/anim/lottie/congra_anim.json";

const ThirdStep = ({ step }) => {
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 3) {
      timer = setTimeout(() => {
        setPlayAnimation(true);
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
        setPlayAnimation(false);
      }
    };
  }, [step]);

  return (
    <div className="w-full h-full bg-[--white-1] flex justify-center items-center relative">
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
        {playAnimation && <Lottie animationData={congraAnim} loop={false} />}
      </div>
      <div className="w-60">
        <Lottie animationData={checkAnim} loop={false} />
      </div>
    </div>
  );
};

export default ThirdStep;
