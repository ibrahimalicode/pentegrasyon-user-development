const GlowButton = ({ text, onClick }) => {
  const buttonAnimations = {
    base: "w-24 py-2 px-2 rounded-md border disabled:py-2.5 disabled:cursor-not-allowed relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600",
    hover: "hover:from-green-600 hover:to-green-700",
    animation: "parlamaAnimation",
    shine: `absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-red-500 opacity-70 kaymaAnimation`,
  };

  return (
    <>
      <style>
        {`
          @keyframes parlama {
            0%, 100% {
              filter: brightness(100%);
              transform: scale(1);
            }
            50% {
              filter: brightness(125%);
              transform: scale(1.08);
            }
          }
          
          @keyframes kayma {
            0% {
              transform: translateX(-100%) skewX(-12deg);
            }
            100% {
              transform: translateX(200%) skewX(-12deg);
            }
          }
          
          @keyframes yaziRengi {
            0%, 100% {
              color: rgb(255, 255, 255);
            }
            50% {
              color: rgb(239, 68, 68);
            }
          }

          .parlamaAnimation {
            animation: parlama 0.8s ease-in-out infinite;
          }

          .kaymaAnimation {
            animation: kayma 1.2s linear infinite;
          }

          .yaziRengiAnimation {
            animation: yaziRengi 1s ease-in-out infinite;
          }
        `}
      </style>
      <button
        onClick={onClick}
        className={`${buttonAnimations.base} text-white ${buttonAnimations.animation} ${buttonAnimations.hover} shadow-lg shadow-green-500/30 transition-all duration-300`}
      >
        <p className="font-bold yaziRengiAnimation">{text}</p>
        <div className={buttonAnimations.shine} />
      </button>
    </>
  );
};

export default GlowButton;
