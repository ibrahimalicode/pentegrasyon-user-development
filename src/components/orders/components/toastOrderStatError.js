import toast from "react-hot-toast";
import { compareWithCurrentDateTime } from "../../../utils/utils";

export default function toastStatusError({ date, minute = 1 }) {
  toast.dismiss();
  const min = compareWithCurrentDateTime(date, null, minute).remainingMinutes;
  const sec = compareWithCurrentDateTime(date, null, minute).remainingSeconds;
  const showSec = sec <= 60;
  const message = `Lütfen ${
    showSec ? `${sec}sn` : `${min}dk`
  } sonra tekrar deneyiniz.`;
  toast.error(message);
}
