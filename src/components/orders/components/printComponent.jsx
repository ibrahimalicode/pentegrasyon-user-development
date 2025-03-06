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
        className="flex justify-center w-full bg-[--light-3] py-2 rounded-md"
      >
        <PrinterI />
      </button>

      <main style={{ display: "none" }}>
        <div ref={contentRef} className="orders-print-content">
          {component}
        </div>
      </main>
      <style>
        {`
          @media print {
            .orders-print-content {
              transform: scale(0.7); /* Scale the content */
              transform-origin: top left; /* Adjust the origin for scaling */
              width: 140%; /* Adjust width to accommodate scaling */
            }
          }
        `}
      </style>
    </main>
  );
};

export default PrintComponent;
