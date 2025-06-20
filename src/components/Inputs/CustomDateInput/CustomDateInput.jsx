import { ErrorMessage, Field } from "formik";
import * as React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import gregorian from "react-date-object/calendars/gregorian";
import arabic_en from "react-date-object/locales/arabic_en";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useLocale } from "next-intl";
import CalendarIcon from "./../../../../public/Icons/Calendar";
import "./CustomDateInput.css";

const CustomDateInput = ({ placeholder, name, dateType }) => {
  const loaclActive = useLocale();
  const datePickerRef = React.useRef(null);
  function convertToEnglishDigits(str) {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
  }

  return (
    <Field name={name}>
      {({ field }) => (
        <div className="CustomDateInput">
          <label htmlFor={name}>Label</label>
          <DatePicker
            ref={datePickerRef}
            calendar={dateType == "arabic" ? arabic : gregorian}
            locale={
              dateType == "arabic"
                ? loaclActive == "ar"
                  ? arabic_ar
                  : arabic_en
                : loaclActive == "ar"
                ? gregorian_ar
                : gregorian_en
            }
            value={field.value}
            onChange={(value) => {
              const newValue = value
                ? new DateObject(value).format("YYYY-MM-DD")
                : "";
              const englishDate = convertToEnglishDigits(newValue);
              field.onChange({
                target: {
                  name: field.name,
                  value: englishDate,
                },
              });
            }}
            render={
              <Input
                id={name}
                placeholder={placeholder}
                open={() =>
                  datePickerRef.current.isOpen
                    ? datePickerRef.current.closeCalendar()
                    : datePickerRef.current.openCalendar()
                }
              />
            }
          />
          <ErrorMessage name={name} component="div" className="ErrorMessage" />
        </div>
      )}
    </Field>
  );
};

const Input = ({ open, ...props }) => {
  return (
    <div className="Input">
      <input {...props} />
      <button onClick={() => open()} type="button">
        <CalendarIcon />
      </button>
    </div>
  );
};
export default CustomDateInput;
