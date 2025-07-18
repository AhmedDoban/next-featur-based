import ReactDropdownSelect from "react-dropdown-select";
import { ErrorMessage, useFormikContext } from "formik";
import "./CustomDropdownSelect.css";
import { useLocale } from "next-intl";

export default function CustomDropdownSelect({
  name,
  label,
  labelField = "label",
  valueField = "value",
  multi = false,
  options,
  value,
  required = false,
  placeholder,
  keepSelected = true,
  onValueChange,
}) {
  const localActive = useLocale();
  const { setFieldValue } = useFormikContext();
  const handleChange = (selected) => {
    setFieldValue(name, multi ? selected : selected[0] || null);
    if (onValueChange) onValueChange(multi ? selected : selected[0] || null);
  };

  return (
    <div className="CustomDropdownSelect">
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

      <ReactDropdownSelect
        name={name}
        options={options}
        values={multi ? value || [] : value ? [value] : []}
        onChange={handleChange}
        multi={multi}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
        className="custom-dropdown-select"
        direction={localActive === "ar" ? "rtl" : "ltr"}
        dropdownPosition="auto"
        keepSelectedInList={keepSelected}
        style={{
          padding: "8px 16px",
          boxShadow: "none",
        }}
      />

      <ErrorMessage
        name={name}
        component="div"
        className="form-error-message"
      />
    </div>
  );
}
