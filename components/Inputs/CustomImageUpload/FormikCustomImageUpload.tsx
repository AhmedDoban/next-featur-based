import { useField } from "formik";
import CustomImageUpload from "./CustomImageUpload";
import { memo } from "react";

interface FormikCustomImageUploadProps {
  name: string;
  label?: string;
  required?: boolean | string;
  title?: string;
  description?: string;
  accept?: string;
}

const FormikCustomImageUpload = memo<FormikCustomImageUploadProps>(
  function FormikCustomImageUpload({ name, ...props }) {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;

    return (
      <CustomImageUpload
        {...props}
        name={name}
        value={field.value}
        onChange={setValue}
      />
    );
  }
);

export default FormikCustomImageUpload;
