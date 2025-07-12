"use client";

import "./Login.css";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import FormikStepper from "@/components/FormikStepper";
import { useState } from "react";
import * as Yup from "yup";
import LoginForm from "@/features/auth/login/LoginForm/LoginForm";
import { useTranslations } from "next-intl";

function Login() {
  const Router = useRouter();
  const [Step, SetStep] = useState(1);
  const Translate = useTranslations();

  return (
    <div className="Login PageBG">
      <div className="container">
        <FormikStepper
          initialValues={{
            email: "",
            password: "",
            remember: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Email must be a valid email")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          Step={Step}
          SetStep={SetStep}
          onSubmit={(values) => {
            Router.refresh();
            values.remember
              ? setCookie("Frontiers_admin_Cookies", "")
              : setCookie("Frontiers_admin_Cookies", "", {
                  maxAge: 60 * 60 * 24,
                });
          }}
        >
          <LoginForm SetStep={SetStep} />
        </FormikStepper>
      </div>
    </div>
  );
}
export default Login;
