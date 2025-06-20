import { Field, useFormikContext } from "formik";
import "./CustomCheckBoxInput.css";

function CustomCheckBoxInput({ name, id, label, value }) {
  const { setFieldValue } = useFormikContext();
  return (
    <div className="CustomCheckBoxInput">
      <Field
        type="checkbox"
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
    </div>
  );
}
export default CustomCheckBoxInput;
