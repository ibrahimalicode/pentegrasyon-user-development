import { useEffect, useState } from "react";
import { compareWithCurrentDateTime } from "../../../utils/utils";

const RemainingSeconds = ({ date, setState, state, m = 1 }) => {
  const comparedSec = () => {
    return compareWithCurrentDateTime(date, null, m).remainingSeconds;
  };
  const [remainingSec, setRemainingSec] = useState(comparedSec);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingSec(comparedSec(new Date()));
      setState(state++);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return remainingSec;
};

export default RemainingSeconds;
