import { useLocale } from "next-intl";
import ArrowLeft from "../../../public/Icons/ArrowLeft";
import ArrowLongRight from "../../../public/Icons/ArrowLongRight";
import "./BackBtn.css";
function BackBtn({ text, iconType, Color = "black", onClick }) {
  const localActive = useLocale();
  return (
    <button
      className={`BackBtn ${Color} ${
        iconType == "Arrow" ? "Arrow" : "LongArrow"
      }`}
      onClick={onClick}
      type="button"
    >
      {iconType == "Arrow" && (
        <div className={`icon ${localActive === "ar" ? "reverce" : ""}`}>
          <ArrowLeft />
        </div>
      )}
      {iconType == "LongArrow" && (
        <div className={`icon ${localActive === "ar" ? "" : "reverce"}`}>
          <ArrowLongRight />
        </div>
      )}
      <span>{text}</span>
    </button>
  );
}
export default BackBtn;
