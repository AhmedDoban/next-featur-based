import React from "react";
import JoditEditor from "jodit-pro-react";
import { useTranslations } from "next-intl";
import "./CustomTextEditor.css";
import { useFormikContext } from "formik";

const CustomTextEditor = React.memo(function CustomTextEditor({
  name,
  placeholder,
  value,
  label,
  required,
}) {
  const editor = React.useRef(null);
  const Translate = useTranslations("common");
  const { setFieldValue } = useFormikContext();

  // Memoize the config to prevent recreating it on every render
  const defaultConfig = React.useMemo(
    () => ({
      license: "C464Q-1GIK1-BF6OK-K290Y",
      height: 300,
      minHeight: 200,
      maxHeight: 500,
      toolbarSticky: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      readonly: false,
      placeholder: placeholder || "Enter text...",
      toolbarAdaptive: false,
      style: {
        font: "14px Arial, sans-serif",
        color: "#212121",
        background: "#fff",
      },
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "|",
        "brush",
        "paragraph",
        "|",
        "image",
        "link",
        "|",
        "align",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
      ],
      uploader: {
        url: "https://frontiers.o-projects.org/api/media/upload",
        format: "json",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        isSuccess: function (response) {
          // Assume success if there is a URL in the response
          return response && response.url;
        },
        getMsg: function (response) {
          // Return a success message or default message
          return response && response.url
            ? "File uploaded successfully"
            : "File upload failed";
        },
        process: function (response) {
          // Determine the file type based on the response or other logic
          const fileType = response.url.match(/\.(jpg|jpeg|png|gif)$/i)
            ? "image"
            : "file";

          return {
            files: [
              {
                path: response.url,
                type: fileType,
              },
            ],
            baseurl: "",
          };
        },
        defaultHandlerSuccess: function (data) {
          const field = "files";
          if (data[field] && data[field].length) {
            for (let i = 0; i < data[field].length; i++) {
              const file = data[field][i];

              // Insert image if it's an image
              if (file.type === "image") {
                this.selection.insertImage(file.path);
              }
              // Insert link if it's a file (non-image)
              else if (file.type === "file") {
                const fileName = file.path.split("/").pop(); // Get file name from path
                this.selection.insertHTML(
                  `<a href="${file.path}" target="_blank">${fileName}</a>`
                );
              }
            }
          }
        },
      },
    }),
    [placeholder]
  );

  // Memoize the content change handler to prevent recreating it
  const handleContentChange = React.useCallback(
    (content) => {
      setFieldValue(name, content);
    },
    [name, setFieldValue]
  );

  return (
    <div className="CustomTextEditor">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && (
            <span className={required === true ? "required" : "optional"}>
              {required === true
                ? " *"
                : typeof required == "string"
                ? ` (${required}) `
                : ` (${Translate("optional")}) `}
            </span>
          )}
        </label>
      )}

      <div className="editor-wrapper">
        <JoditEditor
          config={defaultConfig}
          ref={editor}
          name={name}
          value={value}
          onBlur={(content) => handleContentChange(content)}
        />
      </div>
    </div>
  );
});

// Custom comparison function to prevent unnecessary re-renders
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.value === nextProps.value &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.label === nextProps.label &&
    prevProps.required === nextProps.required
  );
};

export default React.memo(CustomTextEditor, areEqual);
