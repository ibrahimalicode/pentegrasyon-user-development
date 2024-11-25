import { useState, useEffect } from "react";
import "./test.css";

const Test = () => {
  const [color, setColor] = useState("rgb(239, 68, 68)");
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Color changing effect
    const colorInterval = setInterval(() => {
      setColor((prev) =>
        prev === "rgb(239, 68, 68)" ? "rgb(185, 28, 28)" : "rgb(239, 68, 68)"
      );
    }, 500);

    // Tooltip visibility cycle
    const tooltipCycle = () => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 10000); // Hide after 10 seconds
    };

    // Initial tooltip
    tooltipCycle();

    // Set up interval for tooltip
    const tooltipInterval = setInterval(tooltipCycle, 20000); // Full cycle every 20 seconds (10s visible + 10s hidden)

    return () => {
      clearInterval(colorInterval);
      clearInterval(tooltipInterval);
    };
  }, []);

  return (
    <main className="mt-60">
      <div className="relative w-max">
        {/* Tooltip */}
        <div
          className={`absolute -top-16 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 
                   px-4 py-2 rounded-lg border border-red-200 shadow-lg
                   transition-all duration-300 transform
                   ${
                     showTooltip
                       ? "opacity-100 translate-y-0"
                       : "opacity-0 translate-y-2 pointer-events-none"
                   }
                   whitespace-nowrap
                   after:content-[''] after:absolute after:left-1/2 after:-bottom-2
                   after:w-4 after:h-4 after:bg-red-100 after:rotate-45
                   after:-translate-x-1/2 after:border-b after:border-r after:border-red-200`}
        >
          <span className="font-medium">Restoran Kapalı !</span>
        </div>

        {/* Button */}
        <button
          style={{
            backgroundColor: color,
            transition: "all 0.3s ease",
          }}
          className="w-48 py-2.5 px-4 rounded-lg font-medium text-white
                   hover:scale-105 transition-all duration-300
                   shadow-[0_0_20px_rgba(220,38,38,0.7)]
                   animate-pulse
                   relative after:absolute after:inset-0
                   after:rounded-lg after:border-2 after:border-red-500
                   after:animate-[emergencyRipple_1s_ease-out_infinite]
                   before:absolute before:inset-0
                   before:rounded-lg before:border-2 before:border-red-600
                   before:animate-[emergencyRipple_1s_ease-out_infinite]
                   before:delay-500
                   flex items-center justify-center"
        >
          Restoran Durumları
        </button>
      </div>
    </main>
  );
};

export default Test;
