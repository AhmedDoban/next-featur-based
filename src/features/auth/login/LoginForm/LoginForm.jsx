import "./LoginForm.css";
import Image from "next/image";
import CustomInput from "@/components/Inputs/CustomInput/CustomInput";
import CustomCheckBoxInput from "@/components/Inputs/CustomCheckBoxInput/CustomCheckBoxInput";
import Link from "next/link";
import { useLocale } from "next-intl";
import Splitter from "@/components/Splitter/Splitter";

function LoginForm() {
  const localActive = useLocale();

  return (
    <div className="LoginForm OO w600">
      <div className="RightBox" data-aos="fade-up">
        <div className="Info">
          <p>Welcome back</p>
          <h1>Sign In to your Account</h1>
          <span>If you have an account, sign in with your email address.</span>
        </div>
        <div className="FormContent">
          <CustomInput
            type="email"
            name="email"
            placeholder="exampel@info.com"
            label={"Email"}
            required={true}
          />
          <CustomInput
            type="password"
            name="password"
            placeholder={"Password"}
            label={"Password"}
            required={true}
          />
          <div className="ForgotPassword">
            <CustomCheckBoxInput
              name="remember"
              label="Remember me"
              id="remember"
            />

            <Link
              href={`/${localActive}/forgot-password`}
              className="ForgotPasswordLink"
            >
              Forgot Password
            </Link>
          </div>
          <button type="submit" className="Custom-btn">
            <span>Sign In Now</span>
          </button>
          <Splitter text={"Or"} size="w-[70%]" />
          <Link
            href={`/${localActive}/register`}
            className="Custom-btn Transparent"
          >
            <span>Create an Account</span>
          </Link>
        </div>
      </div>
      <div className="leftContent">
        <Image
          src={"/favicon.ico"}
          width={800}
          height={800}
          alt="statue"
          data-aos="fade-up"
          priority
        />
      </div>
    </div>
  );
}
export default LoginForm;
