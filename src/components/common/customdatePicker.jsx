import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import tr from "date-fns/locale/tr"; // Import Turkish locale from date-fns
import { cn } from "../../lib/utils";
import { FIELD_BASE, FIELD_LABEL, FIELD_WRAPPER } from "./fieldStyles";

const CustomDatePicker = ({
  label,
  value,
  onChange,
  placeholder,
  isDisabled,
  className,
  className2,
  popperClassName,
  calendarClassName = "custom-datepicker",
  dateFormat = "dd.MM.yyyy HH:mm",
  hideTimeClassName = true,
}) => {
  //const { i18n } = useTranslation();
  registerLocale("tr", tr);
  return (
    <div className={cn(FIELD_WRAPPER, className2)}>
      {label && <label className={FIELD_LABEL}>{label}</label>}
      <DatePicker
        locale="tr"
        selected={value}
        onChange={onChange}
        showTimeSelect
        dateFormat={dateFormat}
        timeFormat="HH:mm"
        placeholderText={placeholder}
        // react-datepicker's wrapper is inline-block by default, which would
        // stop the w-full in FIELD_BASE from filling the field column.
        wrapperClassName="w-full"
        className={cn(FIELD_BASE, "cursor-pointer", className)}
        disabled={isDisabled}
        popperClassName={popperClassName}
        calendarClassName={
          calendarClassName +
          " " +
          (hideTimeClassName ? "hideTimeClassName" : "")
        }
      />
    </div>
  ); //left 60px 640px-950px
};

export default CustomDatePicker;
