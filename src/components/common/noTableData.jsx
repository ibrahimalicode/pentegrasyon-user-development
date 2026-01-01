const NoTableData = ({ Icon, text }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center sm:mt-28">
      <Icon className="size-32 text-[--gr-1]" strokeWidth={0.9} />
      <p>{text}</p>
    </div>
  );
};

export default NoTableData;
