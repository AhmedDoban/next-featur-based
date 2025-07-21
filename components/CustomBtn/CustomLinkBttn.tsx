import "./CustomBtn.css";
import React from "react";
import { Link } from "@/i18n/routing";
import { CustomLinkBtnProps } from "./CustomBtnType";

function CustomBtn({
  text = "Save & Continue",
  Icon,
  LinkUrl,
  fit = false,
  left = false,
  color,
}: CustomLinkBtnProps) {
  const ClassName = `Custom-btn ${fit ? "fit" : ""} ${left ? "left" : ""} ${
    color ? `${color}` : ""
  }`;

  return (
    <Link className={ClassName} href={LinkUrl}>
      <span>{text}</span>
      {Icon}
    </Link>
  );
}
export default CustomBtn;
