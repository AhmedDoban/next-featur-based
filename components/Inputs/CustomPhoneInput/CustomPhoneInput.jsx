import { ErrorMessage, useField } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./CustomPhoneInput.css";

function CustomPhoneInput({
  name,
  placeholder,
  label,
  required,
  defaultCountry = "EG",
  showDropdown = true,
  format = true,
  disabled = false,
}) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value) => {
    helpers.setValue(value || "");
  };

  return (
    <div className="CustomPhoneInput">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && (
            <span className={required === true ? "required" : "optional"}>
              {required === true
                ? " *"
                : typeof required == "string"
                ? ` (${required}) `
                : ` ( optional ) `}
            </span>
          )}
        </label>
      )}

      <div className="phone-input-wrapper">
        <PhoneInput
          defaultCountry={defaultCountry}
          value={field.value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          international={showDropdown}
          finitialValueFormat={format}
          withCountryCallingCode={true}
          className={`custom-phone-input ${!showDropdown ? "no-dropdown" : ""}`}
        />
      </div>

      <ErrorMessage name={name} component="div" className="ErrorMessage" />
    </div>
  );
}

export default CustomPhoneInput;
