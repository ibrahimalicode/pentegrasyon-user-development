import { useEffect, useState } from "react";
import { compareWithCurrentDateTime } from "../../../utils/utils";

const RemainingMinutes = ({ date }) => {
  const comparedMin = (now = new Date()) => {
    return compareWithCurrentDateTime(date, now);
  };
  const [remainingMin, setRemainingMin] = useState(comparedMin);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingMin(comparedMin(new Date()));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return remainingMin && <p className="text-[--red-1]">🕑 {remainingMin}</p>;
};

export default RemainingMinutes;
