"use client";

import "./forgot-password.css";
import { useRouter } from "next/navigation";
import FormikStepper from "../../../components/FormikStepper";
import { useState } from "react";
import * as Yup from "yup";
import SendEmail from "./SendEmail/SendEmail";
import OTP from "./OTP/OTP";
import ResetPassword from "./ResetPassword/ResetPassword";

function ForgotPassword() {
  const Router = useRouter();
  const [Step, SetStep] = useState(1);

  return (
    <div className="ForgotPasswordPage PageBG OO w600">
      <div className="container">
        <FormikStepper
          initialValues={{
            email: "",
            emailVerification: false,
            otp: "",
            OTPVerification: false,
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            otp:
              Step == 2
                ? Yup.string().required("OTP is required")
                : Yup.string().notRequired(),
            password:
              Step == 3
                ? Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required")
                : Yup.string().notRequired(),
            confirmPassword:
              Step == 3
                ? Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Confirm password is required")
                : Yup.string().notRequired(),
          })}
          Step={Step}
          SetStep={SetStep}
          onSubmit={(values) => {
            console.log("Form submitted with values:", values);
          }}
        >
          <SendEmail SetStep={SetStep} />
          <OTP SetStep={SetStep} />
          <ResetPassword SetStep={SetStep} />
        </FormikStepper>
      </div>
    </div>
  );
}
export default ForgotPassword;
