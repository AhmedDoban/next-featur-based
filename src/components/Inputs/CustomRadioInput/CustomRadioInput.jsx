import { ErrorMessage, Field, useFormikContext } from "formik";
import "./CustomRadioInput.css";

function CustomRadioInput({ name, id, label, value }) {
  const { setFieldValue } = useFormikContext();
  return (
    <div className="CustomRadioInput">
      <Field
        type="radio"
        id={id}
        name={name}
        value={value}
        hidden
        style={{
          position: "absolute",
          top: "2px",
          left: "2px",
          zIndex: -1,
        }}
      />
      <label htmlFor={id} onChange={() => setFieldValue(name, value)}>
        {label}
      </label>
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
}
export default CustomRadioInput;
