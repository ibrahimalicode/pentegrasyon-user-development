import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TypingEffect from "../../common/typingEffect";

//COMP
import checkAnim from "../../../assets/anim/lottie/check_anim.json";
import congraAnim from "../../../assets/anim/lottie/congra_anim.json";
import { TOOLBAR_BTN_PRIMARY } from "../../../components/common/toolbarStyles";
import { cn } from "../../../lib/utils";

const SuccessPage = ({ step, currentPath, actionType }) => {
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    let timer;
    let clearAnim;

    if (step === 5) {
      timer = setTimeout(() => {
        setPlayAnimation(true);
      }, 2000);

      clearAnim = setTimeout(() => setPlayAnimation(false), 7000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
        setPlayAnimation(false);
      }
      if (clearAnim) {
        clearTimeout(clearAnim);
      }
    };
  }, [step]);

  return (
    <main className="w-full h-full flex justify-center">
      <div className="w-[325px] overflow-visible relative">
        <div className="w-full bg-[--white-1] flex justify-center items-center relative overflow-visible">
          <div className="absolute w-full top-0 left-0">
            {playAnimation && (
              <Lottie animationData={congraAnim} loop={false} />
            )}
          </div>
          <div className="w-60">
            <Lottie animationData={checkAnim} loop={false} />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="text-[--green-1] text-xl mt-10 h-14 w-60">
            <TypingEffect
              text="Ödeme işleminiz başarlı."
              speed={40}
              delay={4000}
            />
          </div>
        </div>

        <div className="w-full flex justify-center pb-8">
          <Link
            to={currentPath?.replace(`/${actionType}`, "")}
            className={cn(TOOLBAR_BTN_PRIMARY, "group z-[999]")}
          >
            Lisanslara git
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SuccessPage;
