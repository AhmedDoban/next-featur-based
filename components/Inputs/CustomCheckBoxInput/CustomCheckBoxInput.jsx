import { ErrorMessage, Field, useFormikContext } from "formik";
import "./CustomCheckBoxInput.css";
import { useLocale } from "next-intl";

function CustomCheckBoxInput({ name, id, label, value }) {
  const { setFieldValue } = useFormikContext();
  const localActive = useLocale();
  return (
    <div className={`CustomCheckBoxInput ${localActive}`}>
      <Field type="checkbox" id={id} name={name} value={value} hidden />
      <label htmlFor={id} onChange={() => setFieldValue(name, value)}>
        {label}
      </label>
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
}
export default CustomCheckBoxInput;
