import ImageIcon from "../../../../public/Icons/Image";
import "./CustomImageUpload.css";
import { useFormikContext } from "formik";
import Image from "next/image";

function CustomImageUpload({
  label,
  required,
  title,
  description,
  name,
  accept,
}) {
  const { setFieldValue, values } = useFormikContext();

  return (
    <div className="CustomImageUpload">
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
      <input
        type="file"
        name={name}
        id={name}
        hidden
        accept={accept}
        onChange={(e) => {
          setFieldValue(name, e.target.files[0]);
        }}
      />
      <label htmlFor={name}>
        {values[name] ? (
          <Image
            src={URL.createObjectURL(values[name])}
            width={1440}
            height={650}
            alt="Image"
          />
        ) : (
          <>
            <ImageIcon />
            <h1>{title}</h1>
            <p>{description}</p>
          </>
        )}
      </label>
    </div>
  );
}
export default CustomImageUpload;
