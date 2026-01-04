const NoTableData = ({ Icon, text }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center sm:mt-28">
      <Icon className="size-[8rem] text-[--gr-1]" strokeWidth={0.9} />
      <p className="text-[--black-1]">{text}</p>
    </div>
  );
};

export default NoTableData;
