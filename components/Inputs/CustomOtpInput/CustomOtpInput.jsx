import { ErrorMessage, useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import "./CustomOtpInput.css";
import OtpInput from "react-otp-input";

function CustomOtpInput({ name, label, required, numInputs }) {
  const { setFieldValue, values } = useFormikContext();
  const Translate = useTranslations("common");

  return (
    <div className="CustomOtpInput">
      <label htmlFor={name}>
        {label}
        {required && (
          <span className={required === true ? "required" : "optional"}>
            {required === true
              ? " *"
              : typeof required == "string"
              ? ` (${required} ) `
              : ` (${Translate("optional")}) `}
          </span>
        )}
      </label>

      <OtpInput
        value={values[name] || ""}
        onChange={(otp) => setFieldValue(name, otp)}
        numInputs={numInputs}
        renderSeparator={false}
        renderInput={(props) => <input {...props} name={name} id={name} />}
        containerStyle="input-wrapper"
        inputStyle="Otp-input"
      />

      <ErrorMessage name={name} component="div" className="ErrorMessage" />
    </div>
  );
}

export default CustomOtpInput;
