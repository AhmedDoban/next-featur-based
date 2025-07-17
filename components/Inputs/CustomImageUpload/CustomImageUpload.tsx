import "./CustomImageUpload.css";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { useState, memo, useCallback, ChangeEvent, DragEvent } from "react";
import ShowToast from "../../Toast/ShowToast";

interface CustomImageUploadProps {
  label?: string;
  required?: boolean | string;
  title?: string;
  description?: string;
  name: string;
  accept?: string;
  value?: File | null;
  onChange: (file: File | string) => void;
}

const CustomImageUpload = memo<CustomImageUploadProps>(
  function CustomImageUpload({
    label,
    required,
    title,
    description,
    name,
    accept,
    value,
    onChange,
  }) {
    const hasValue = Boolean(value);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const handleFile = useCallback(
      (file: File | null) => {
        if (!onChange) {
          ShowToast("error", "CustomImageUpload: onChange prop is required");
          return;
        }

        if (file && (!accept || file.type.match(accept.replace(/,/g, "|")))) {
          onChange(file);
        } else {
          onChange("");
        }
      },
      [accept, onChange]
    );

    const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
          handleFile(files[0]);
        }
      },
      [handleFile]
    );

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        handleFile(file);
      },
      [handleFile]
    );

    return (
      <div
        className="CustomImageUpload"
        data-has-file={hasValue ? "true" : "false"}
        data-drag-over={isDragOver ? "true" : "false"}
      >
        {label && (
          <label htmlFor={name}>
            {label}
            {required && (
              <span className={required === true ? "required" : "optional"}>
                {required === true
                  ? " *"
                  : typeof required === "string"
                  ? ` (${required}) `
                  : ` (optional) `}
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
          onChange={handleInputChange}
        />
        <label
          htmlFor={name}
          className={`${hasValue ? "has-file" : "no-file"} ${
            isDragOver ? "drag-over" : ""
          }`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {value ? (
            <Image
              src={URL.createObjectURL(value)}
              width={1440}
              height={650}
              alt="Image"
            />
          ) : (
            <>
              <CiImageOn />
              <h1>{title}</h1>
              <p>{description}</p>
            </>
          )}
        </label>
      </div>
    );
  }
);

export default CustomImageUpload;
