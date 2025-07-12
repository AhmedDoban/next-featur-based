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
import { HiCalendarDays } from "react-icons/hi2";
import ReactDropdownSelect from "react-dropdown-select";
import "./CustomDateInput.css";

const CustomDateInput = ({
  label,
  required,
  placeholder,
  name,
  dateType,
  inputType = "datetime",
}) => {
  const loaclActive = useLocale();
  const datePickerRef = React.useRef(null);

  function convertToEnglishDigits(str) {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
  }

  // Generate time options (00:00 to 11:45 with 15-minute intervals for 12-hour format)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let quarter = 0; quarter < 4; quarter++) {
        const minutes = quarter * 15;
        const displayHour = hour === 0 ? 12 : hour;
        const timeValue = `${displayHour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        times.push({
          label: timeValue,
          value: timeValue,
        });
      }
    }
    return times;
  };

  // Generate period options (AM/PM)
  const generatePeriodOptions = () => [
    { label: "Am", value: "Am" },
    { label: "Pm", value: "Pm" },
  ];

  // Helper function to combine datetime values into ISO format
  const combineDateTime = (date, time, period) => {
    if (!date) return "";

    let timeStr = time || "09:00";
    const periodStr = period || "Am";

    // Convert 12-hour format to 24-hour format
    const [hours, minutes] = timeStr.split(":");
    let hour24 = parseInt(hours);

    if (periodStr === "Pm" && hour24 !== 12) {
      hour24 = hour24 + 12;
    } else if (periodStr === "Am" && hour24 === 12) {
      hour24 = 0;
    }

    const finalTimeStr = `${hour24.toString().padStart(2, "0")}:${minutes}`;
    return `${date}T${finalTimeStr}`;
  };

  // Helper function to parse datetime value (handles both formats)
  const parseDateTime = (value) => {
    if (!value) return { date: "", time: "12:00", period: "Am" };

    // Handle ISO format: "2025-07-02T14:30"
    if (value.includes("T")) {
      const [datePart, timePart] = value.split("T");
      const [hours, minutes] = timePart.split(":");
      const hour24 = parseInt(hours);

      // Convert 24-hour to 12-hour format
      let hour12, period;
      if (hour24 === 0) {
        hour12 = 12;
        period = "Am";
      } else if (hour24 < 12) {
        hour12 = hour24;
        period = "Am";
      } else if (hour24 === 12) {
        hour12 = 12;
        period = "Pm";
      } else {
        hour12 = hour24 - 12;
        period = "Pm";
      }

      const time12 = `${hour12.toString().padStart(2, "0")}:${minutes}`;

      return {
        date: datePart,
        time: time12,
        period: period,
      };
    }

    // Handle legacy format: "2025-07-02 14:30 Pm"
    const parts = value.split(" ");
    if (parts.length >= 3) {
      return {
        date: parts[0],
        time: parts[1],
        period: parts[2],
      };
    } else if (parts.length === 2) {
      return {
        date: parts[0],
        time: parts[1],
        period: "Am",
      };
    } else {
      // Date only
      return {
        date: parts[0] || value,
        time: "12:00",
        period: "Am",
      };
    }
  };

  // If inputType is "date", render only date input
  if (inputType === "date") {
    return (
      <Field name={name}>
        {({ field }) => (
          <div className="CustomDateInput">
            <label htmlFor={name}>
              {label}
              {required && (
                <span className={required === true ? "required" : "optional"}>
                  {required === true
                    ? " *"
                    : typeof required == "string"
                    ? ` (${required}) `
                    : ` (optional) `}
                </span>
              )}
            </label>
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
            <ErrorMessage
              name={name}
              component="div"
              className="ErrorMessage"
            />
          </div>
        )}
      </Field>
    );
  }

  // Default behavior: render date and time inputs
  return (
    <Field name={name}>
      {({ field }) => {
        const { date, time, period } = parseDateTime(field.value);

        return (
          <div className="CustomDateInput datetime-container">
            {label && (
              <label htmlFor={name}>
                {label}
                {required && (
                  <span className={required === true ? "required" : "optional"}>
                    {required === true
                      ? " *"
                      : typeof required == "string"
                      ? ` (${required}) `
                      : ` (optional) `}
                  </span>
                )}
              </label>
            )}

            <div className="datetime-inputs">
              {/* Date Input */}
              <div className="date-input-wrapper">
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
                  value={date}
                  onChange={(value) => {
                    const newDate = value
                      ? new DateObject(value).format("YYYY-MM-DD")
                      : "";
                    const englishDate = convertToEnglishDigits(newDate);
                    const combinedValue = combineDateTime(
                      englishDate,
                      time,
                      period
                    );

                    field.onChange({
                      target: {
                        name: field.name,
                        value: combinedValue,
                      },
                    });
                  }}
                  render={
                    <Input
                      id={`${name}_date`}
                      placeholder={placeholder || "yyyy-mm-dd"}
                      open={() =>
                        datePickerRef.current.isOpen
                          ? datePickerRef.current.closeCalendar()
                          : datePickerRef.current.openCalendar()
                      }
                    />
                  }
                />
              </div>

              {/* Time Input */}
              <div className="time-input-wrapper">
                <ReactDropdownSelect
                  options={generateTimeOptions()}
                  values={generateTimeOptions().filter(
                    (option) => option.value === time
                  )}
                  placeholder="09:00"
                  direction={loaclActive === "ar" ? "rtl" : "ltr"}
                  dropdownPosition="auto"
                  keepSelectedInList={false}
                  className="custom-dropdown-select"
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#212121",
                    width: "100%",
                    backgroundColor: "#fff",
                    border: "1px solid #89939e",
                    minHeight: "43px",
                    padding: "8px 16px",
                    boxShadow: "none",
                    borderRadius: "0.5rem",
                    transition: "all 0.5s ease-in-out",
                  }}
                  onChange={(values) => {
                    const newTime =
                      values.length > 0 ? values[0].value : "09:00";
                    const combinedValue = combineDateTime(
                      date,
                      newTime,
                      period
                    );
                    field.onChange({
                      target: {
                        name: field.name,
                        value: combinedValue,
                      },
                    });
                  }}
                />
              </div>

              {/* AM/PM Input */}
              <div className="period-input-wrapper">
                <ReactDropdownSelect
                  options={generatePeriodOptions()}
                  values={generatePeriodOptions().filter(
                    (option) => option.value === period
                  )}
                  placeholder="Am"
                  direction={loaclActive === "ar" ? "rtl" : "ltr"}
                  dropdownPosition="auto"
                  keepSelectedInList={false}
                  className="custom-dropdown-select"
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#212121",
                    width: "100%",
                    backgroundColor: "#fff",
                    border: "1px solid #89939e",
                    minHeight: "43px",
                    padding: "8px 16px",
                    boxShadow: "none",
                    borderRadius: "0.5rem",
                    transition: "all 0.5s ease-in-out",
                  }}
                  onChange={(values) => {
                    const newPeriod =
                      values.length > 0 ? values[0].value : "Am";
                    const combinedValue = combineDateTime(
                      date,
                      time,
                      newPeriod
                    );
                    field.onChange({
                      target: {
                        name: field.name,
                        value: combinedValue,
                      },
                    });
                  }}
                />
              </div>
            </div>
            <ErrorMessage
              name={name}
              component="div"
              className="ErrorMessage"
            />
          </div>
        );
      }}
    </Field>
  );
};

const Input = ({ open, ...props }) => {
  return (
    <div className="Input">
      <input {...props} />
      <button onClick={() => open()} type="button" className="calendar-button">
        <HiCalendarDays className="calendar-icon" />
      </button>
    </div>
  );
};
export default CustomDateInput;
