"use client";
import "./CustomBtn.css";
import React from "react";
import { useLocale } from "next-intl";
import { CustomBtnProps } from "./CustomBtnType";

function CustomBtn({
  text = "Save & Continue",
  Icon,
  type = "button",
  fit = false,
  left = false,
  onClick,
  color,
}: CustomBtnProps) {
  const LocalActive = useLocale();
  const ClassName = `Custom-btn ${fit ? "fit" : ""} ${left ? "left" : ""} ${
    color ? `${color}` : ""
  }`;

  return (
    <button
      className={ClassName}
      type={type}
      onClick={(e) => onClick && onClick(e)}
    >
      <span>{text}</span>
      {Icon}
    </button>
  );
}
export default CustomBtn;
