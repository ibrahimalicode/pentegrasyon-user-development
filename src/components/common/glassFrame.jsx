import imgUrl from "../../assets/img/pentegrasyon.png";
import VideoLoop from "./videoLoop";

const GlassFrame = ({ component, className, className2 }) => {
  return (
    <section
      className={`px-[4%] pt-36 bg-no-repeat relative bg-black ${className}`}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0 right-0  bg-gradient-to-r from-[--primary-1] to-indigo- inline-block text-transparent bg-clip-text text-2xl p-4 font-[conthrax] text-center text-white z-[999]">
        Pentegrasyon
      </div>
      <VideoLoop />
      <div
        className={`max-w-md mx-auto p-6 pt-10 text-[--white-1] bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[--gr-1] ${className2}`}
      >
        {component}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[999] text-white text-center font-light py-3 px-[4%] text-sm bg-indigo-500/60">
        Pentegrasyon bir LiwaSoft iştirakidir.{" "}
        <span className="max-sm:hidden">- </span>
        <span className="max-sm:block">
          Müşteri Hizmetleri :{" "}
          <a href="tel:08508407807" className="text-lime-400">
            0850 840 78 07
          </a>
        </span>
      </div>
    </section>
  );
};

export default GlassFrame;
