import { BellI } from "../../assets/icon";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 flex flex-col justify-center items-end h-16 py-3.5 bg-white border-b border-slate-200 max-md:px-5">
      <nav className="flex gap-4 mr-2.5 sm:mr-6">
        <button className="flex justify-center items-center p-[.7rem] w-10 h-10 bg-[--light-1] text-[--primary-1] rounded-3xl">
          <BellI />
        </button>
        <div className="flex justify-center items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/82f5fdf361ec38346aaa86a20ed298879a9386866a8e0a8f3cb7ea6f7ffc5772?apiKey=1f4fb250339844f88428d2cbf4e019e9&&apiKey=1f4fb250339844f88428d2cbf4e019e9"
            alt="User avatar"
            className="w-10 rounded-full aspect-square"
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
