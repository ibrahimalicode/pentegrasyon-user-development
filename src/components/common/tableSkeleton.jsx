const TableSkeleton = () => {
  return (
    <div className="w-full text-sm font-light border border-solid border-[--border-1] rounded-lg overflow-hidden fade">
      <div>
        <div className="bg-[--light-3] h-8 text-left"></div>
      </div>
      <div>
        <div className="odd:bg-[--white-1] even:bg-[--table-odd] w-full h-14 border-b border-solid border-[--border-1]"></div>
        <div className="odd:bg-[--white-1] even:bg-[--table-odd] w-full h-14 border-b border-solid border-[--border-1]"></div>
        <div className="odd:bg-[--white-1] even:bg-[--table-odd] w-full h-14 border-b border-solid border-[--border-1]"></div>
        <div className="odd:bg-[--white-1] even:bg-[--table-odd] w-full h-14 border-b border-solid border-[--border-1]"></div>
        <div className="odd:bg-[--white-1] even:bg-[--table-odd] w-full h-14 border-b border-solid border-[--border-1]"></div>
        <div className="odd:bg-[--white-1] even:bg-[--table-odd] w-full h-14 border-b border-solid border-[--border-1]"></div>
        <div className="odd:bg-[--white-1] even:bg-[--table-odd] w-full h-14 border-b border-solid border-[--border-1]"></div>
        <div className="odd:bg-[--white-1] even:bg-[--table-odd] w-full h-14 border-b border-solid border-[--border-1] last:border-b-0"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;
