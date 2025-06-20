import { ErrorMessage, Field, useField } from "formik";
import { useState } from "react";
import "./CustomInput.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function CustomInput({ type, name, placeholder, label }) {
  const [field] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="CustomInput">
      <label htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        <Field
          {...field}
          type={inputType}
          name={name}
          placeholder={placeholder}
          id={name}
        />
        {isPassword && (
          <button
            className={
              showPassword ? "toggle-password active" : "toggle-password"
            }
            onClick={togglePassword}
            type="button"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      <ErrorMessage name={name} component="div" className="ErrorMessage" />
    </div>
  );
}

export default CustomInput;
