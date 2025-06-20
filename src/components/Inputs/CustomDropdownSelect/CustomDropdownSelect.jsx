import Select from "react-select";
import { ErrorMessage } from "formik";
import "./CustomDropdownSelect.css";

export default function CustomDropdownSelect({
  name,
  label,
  labelField = "label",
  valueField = "value",
  multi = false,
  setFieldValue,
  DropOptions,
  value,
  optional,
}) {
  const selectedValue = multi
    ? DropOptions.filter((option) =>
        value?.some((val) => val?.[valueField] === option?.[valueField])
      )
    : DropOptions.find(
        (option) => option?.[valueField] === value?.[valueField]
      );

  const handleChange = (selectedOption) => {
    setFieldValue(name, multi ? selectedOption || [] : selectedOption || null);
  };

  const formattedOptions = DropOptions.map((option) => ({
    label: option[labelField],
    value: option[valueField],
    original: option,
  }));

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "var(--White)",
      border: `1px solid ${
        state.isFocused ? "var(--D_Blue)" : "var(--L_Grey)"
      }`,
      borderRadius: "var(--main-border-radius)",
      boxShadow: "none",
      padding: "4px 6px",
      fontSize: "14px",
      fontWeight: 300,
      minHeight: "40px",
    }),
    option: (base, state) => ({
      ...base,
      fontSize: "14px",
      backgroundColor: state.isSelected
        ? "var(--D_Blue)"
        : state.isFocused
        ? "#f2f2f2"
        : "var(--White)",
      color: state.isSelected ? "white" : "var(--Black)",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 10,
      borderRadius: "var(--main-border-radius)",
      backgroundColor: "var(--White)",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--L_Grey)",
      borderRadius: "8px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--Neutral-Grey)",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--Black)",
    }),
  };

  return (
    <div className="CustomDropdownSelect">
      <label htmlFor={name}>
        {label}
        {optional && <span className="optional-text"> (Optional)</span>}
      </label>
      <div className="input-box">
        <Select
          name={name}
          options={formattedOptions}
          value={selectedValue}
          onChange={handleChange}
          isMulti={multi}
          styles={customStyles}
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.value}
          classNamePrefix="custom-select"
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="form-error-message"
      />
    </div>
  );
}
