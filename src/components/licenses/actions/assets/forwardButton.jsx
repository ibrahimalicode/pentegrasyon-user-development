import { ArrowIR } from "../../../../assets/icon";

const ForwardButton = ({ step }) => {
  return (
    <button
      type="submit"
      className="flex items-center py-2.5 whitespace-nowrap px-3 rounded-md text-sm border-[1.5px] disabled:cursor-not-allowed justify-center w-24 text-[--white-1] bg-[--primary-1] border-[--primary-1] group border-none"
      // onClick={handleSubmit}
    >
      {step === 2 ? "Tamamla" : "Devam"}
      {step === 2 ? null : (
        <div className="translate-x-1 transition-transform duration-200 ease-in-out group-hover:translate-x-2">
          <ArrowIR className="size-[16px]" />
        </div>
      )}
    </button>
  );
};

export default ForwardButton;
