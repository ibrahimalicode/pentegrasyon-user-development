import { useEffect, useState } from "react";
import { compareWithCurrentDateTime } from "../../../utils/utils";

const RemainingSeconds = ({ date, setState, state, m = 1 }) => {
  const comparedSec = () => {
    const now = new Date();
    const oneMinuteAhead = new Date(new Date(date).getTime() + 60000 * m);
    return compareWithCurrentDateTime(oneMinuteAhead, now).remainingSeconds;
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
