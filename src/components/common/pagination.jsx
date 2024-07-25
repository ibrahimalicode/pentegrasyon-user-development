import { ArrowIL, ArrowIR } from "../../assets/icon/index";

const CustomPagination = () => {
  return (
    <div>
      <div className="flex gap-1">
        <button className="flex gap-2 text-sm items-center px-2 max-sm:pr-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-[--light-3]">
          <ArrowIL className="w-4" /> Previous
        </button>
        <div className="flex sm:gap-1">
          <button className="py-2 px-4 text-sm border border-solid border-transparent hover:border-[--border-1] rounded-md">
            1
          </button>
          <button className="py-2 px-4 text-sm border border-solid border-transparent hover:border-[--border-1] rounded-md">
            2
          </button>
          <button className="py-2 px-4 text-sm border border-solid border-transparent hover:border-[--border-1] rounded-md">
            3
          </button>
          <button className="flex items-center py-2 px-4 text-sm">...</button>
        </div>
        <button className="flex gap-2 text-sm items-center px-2 max-sm:pr-3 sm:px-4 py-2 rounded-md hover:bg-[--light-3]">
          Next
          <ArrowIR className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
