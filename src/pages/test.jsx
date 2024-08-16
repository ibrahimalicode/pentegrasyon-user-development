import Lottie from "lottie-react";
import checkAnim from "../assets/anim/lottie/check_anim.json";

const Test = () => {
  return (
    <section className="min-h-0 md:ml-[280px] px-[4%] pt-28">
      <Lottie animationData={checkAnim} loop={false} />
    </section>
  );
};

export default Test;
