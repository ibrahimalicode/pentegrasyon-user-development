import { ArrowIL } from "../../../../assets/icon";

const BackButton = ({ step, setStep }) => {
  return (
    <button
      type="button"
      // disabled={step !== 2}
      className={`flex items-center py-2.5 whitespace-nowrap px-3 rounded-md text-sm border-[1.5px] disabled:cursor-not-allowed justify-center w-24 text-[--white-1] bg-[--primary-1] border-[--primary-1] group border-none ${
        step === 1 && "hidden"
      }`}
      onClick={() => setStep(step - 1)}
    >
      <div
        className={`-translate-x-1 transition-transform duration-200 ease-in-out group-hover:-translate-x-2`}
      >
        <ArrowIL className="size-[16px]" />
      </div>
      Geri
    </button>
  );
};

export default BackButton;
