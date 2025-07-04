import "./CustomRadioWithLogo.css";
import { Field, useFormikContext } from "formik";

function CustomRadioWithLogo({ id, label, name, value, Logo, LogoStyle }) {
  const { setFieldValue } = useFormikContext();
  return (
    <div className="CustomRadioWithLogo">
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
        <div className={LogoStyle}>{Logo}</div>
        <div>{label}</div>
      </label>
    </div>
  );
}
export default CustomRadioWithLogo;
