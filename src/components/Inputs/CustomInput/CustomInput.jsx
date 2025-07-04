import { ErrorMessage, Field, useField } from "formik";
import { useState } from "react";
import { useTranslations } from "next-intl";
import "./CustomInput.css";
import EyeSlash from "../../../../public/Icons/EyeSlash";
import Eye from "../../../../public/Icons/Eye";
import Search from "../../../../public/Icons/Search";

function CustomInput({ 
  type = "text", 
  name, 
  placeholder, 
  label, 
  required, 
  maxLength = null,
  showCharCount = false 
}) {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isTextarea = type === "textarea";
  const inputType = isPassword && showPassword ? "text" : type;
  const togglePassword = () => setShowPassword((prev) => !prev);
  const Translate = useTranslations("common");

  // Character count logic
  const currentLength = field.value ? field.value.length : 0;
  const shouldShowCharCount = showCharCount || (isTextarea && maxLength);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // If maxLength is set, enforce the limit
    if (maxLength && value.length > maxLength) {
      return; // Don't update if exceeding limit
    }
    
    helpers.setValue(value);
  };

  return (
    <div className="CustomInput">
      {label && (
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
      )}
      <div className="input-wrapper">
        {type == "search" && (
          <div className="toggle-password">
            <Search />
          </div>
        )}

        <Field
          {...field}
          type={inputType}
          name={name}
          placeholder={placeholder}
          id={name}
          maxLength={maxLength}
          onChange={maxLength ? handleInputChange : field.onChange}
          as={isTextarea ? "textarea" : "input"}
        />
        {isPassword && (
          <button
            className={
              showPassword ? "toggle-password active" : "toggle-password"
            }
            onClick={togglePassword}
            type="button"
          >
            {showPassword ? <Eye /> : <EyeSlash />}
          </button>
        )}
      </div>
      
      {/* Character Counter */}
      {shouldShowCharCount && (
        <div className="char-counter">
          <span className={currentLength === maxLength ? "char-limit-reached" : ""}>
            {currentLength}
            {maxLength && `/${maxLength}`}
            {maxLength && currentLength === maxLength && " (limit reached)"}
          </span>
        </div>
      )}
      
      <ErrorMessage name={name} component="div" className="ErrorMessage" />
    </div>
  );
}

export default CustomInput;
