import { NoOrdersI } from "../../../assets/icon";

const NoOrdersPlaceholder = () => {
  return (
    <main className="w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="text-[--status-primary-1]">
          <NoOrdersI className="size-[20rem]" fill="currentColor" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-[--gr-1]">Oops!</h1>
          <p className="text-[--red-1] opacity-60">Henüz Sipariş Alınmadı.</p>
        </div>
      </div>
    </main>
  );
};

export default NoOrdersPlaceholder;
