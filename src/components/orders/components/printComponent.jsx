import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrinterI } from "../../../assets/icon";

const PrintComponent = ({ component }) => {
  const contentRef = useRef(component);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <main>
      <button
        onClick={() => {
          handlePrint();
          // console.log(contentRef.current);
        }}
        className="flex justify-center w-full bg-gray-200 py-2 rounded-md"
      >
        <PrinterI />
      </button>

      <main style={{ display: "none" }}>
        <div ref={contentRef} className="scale-[.7]">
          {component}
        </div>
      </main>
    </main>
  );
};

export default PrintComponent;
