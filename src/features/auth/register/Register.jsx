"use client";

import "./Register.css";
import { useRouter } from "next/navigation";
import FormikStepper from "@/components/FormikStepper";
import { useState } from "react";
import * as Yup from "yup";
import RegisterForm from "@/features/auth/register/RegisterForm/RegisterForm";

function Register() {
  const Router = useRouter();
  const [Step, SetStep] = useState(1);

  return (
    <div className="Register PageBG">
      <div className="container">
        <FormikStepper
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string()
              .min(2, "First name must be at least 2 characters")
              .max(50, "First name must be less than 50 characters")
              .required("First name is required"),
            last_name: Yup.string()
              .min(2, "Last name must be at least 2 characters")
              .max(50, "Last name must be less than 50 characters")
              .required("Last name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
            confirm_password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Confirm password is required"),
          })}
          Step={Step}
          SetStep={SetStep}
          onSubmit={(values) => {
            console.log("Register values", values);
          }}
        >
          <RegisterForm SetStep={SetStep} />
        </FormikStepper>
      </div>
    </div>
  );
}
export default Register;
