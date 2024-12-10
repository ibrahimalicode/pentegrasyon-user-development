import { useState } from "react";

const Test = () => {
  const [btnClass, setBtnClass] = useState(null);

  function changeTheBtn() {
    const className =
      "relative overflow-clip after:absolute after:top-0 after:left-0 after:bg-red-400 after:w-full after:h-full after:transition-transform after:duration-[5000ms] after:-translate-x-[100%] after:rounded-md after:ease-in-out";
    setBtnClass(btnClass ? null : className);
  }
  return (
    <main className="mt-60 flex justify-center">
      <button
        onClick={changeTheBtn}
        className={`w-24 py-3.5 px-2 rounded-md border disabled:py-2.5 disabled:cursor-not-allowed after:translate-x-0 ${btnClass}`}
      >
        <span className="relative z-10">Hello</span>
      </button>
    </main>
  );
};

export default Test;
