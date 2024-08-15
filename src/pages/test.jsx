import { useState } from "react";

const Test = () => {
  const [step, setStep] = useState(1);

  const handleStep = () => {
    setStep(step === 1 ? 2 : step === 2 ? 3 : 1);
  };

  return (
    <section className="min-h-0 md:ml-[280px] px-[4%] pt-28">
      <div className="size-64 p-4 border border-solid border-[--light-1] flex relative overflow-hidden">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`absolute left-2 right-2 top-2 bottom-2 flex justify-center items-center bg-[--light-1] rounded-md transition-transform duration-500 ease-in-out ${
              step === num ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform:
                step === num
                  ? "translateX(0)"
                  : `translateX(${(num - step) * 15}rem)`,
            }}
          >
            {num}
          </div>
        ))}
      </div>
      <div>
        <button
          className="px-4 py-2 bg-[--primary-1] text-[--white-1] rounded-lg text-sm"
          onClick={handleStep}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Test;
