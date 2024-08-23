const StepFrame = ({ step, steps, component }) => {
  const stepsArray = Array.from({ length: steps }, (_, index) => index + 1);

  return stepsArray.map((num, index) => (
    <div
      key={num}
      className={`absolute left-1 right-1 top-1 bottom-1 transition-transform duration-500 ease-in-out ${
        step === num ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform:
          step === num
            ? "translateX(0)"
            : `translateX(${(num - step) * 40}rem)`,
      }}
    >
      {component[index]}
    </div>
  ));
};

export default StepFrame;
