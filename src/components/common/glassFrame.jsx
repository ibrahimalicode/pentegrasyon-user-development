import imgUrl from "../../assets/img/pentegrasyon.png";

const GlassFrame = ({ component, className }) => {
  return (
    <section
      className={`px-[4%] pt-36 bg-no-repeat relative ${className}`}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-0 left-0  bg-gradient-to-r from-[--primary-1] to-indigo-100 inline-block text-transparent bg-clip-text text-2xl p-4 font-[conthrax]">
        Pentegrasyon
      </div>
      <div className="max-w-md mx-auto p-6 pt-10 text-[--white-1] bg-gray-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-[--gr-1]">
        {component}
      </div>
    </section>
  );
};

export default GlassFrame;
