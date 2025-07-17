import "./ResetPassword.css";
import Image from "next/image";
import CustomInput from "../../../../components/Inputs/CustomInput/CustomInput";

function ResetPassword() {
  return (
    <div className="ResetPassword">
      <div className="RightBox" data-aos="fade-up">
        <div className="Info">
          <p>Welcome </p>
          <h1>Reset password ?</h1>
          <p>Please enter your New password.</p>
        </div>
        <div className="FormContent">
          <CustomInput
            type="password"
            name="password"
            placeholder="New Password"
            label="New Password"
            required={true}
          />
          <CustomInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            label="Confirm Password"
            required={true}
          />
          <button type="submit" className="Custom-btn">
            <span>Reset Password</span>
          </button>
        </div>
      </div>
      <div className="leftContent">
        <Image
          src={"/Images/statue1.png"}
          width={300}
          height={100}
          alt="statue"
          data-aos="fade-up"
          priority
        />
      </div>
    </div>
  );
}
export default ResetPassword;
