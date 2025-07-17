import "./OTP.css";
import Image from "next/image";
import CustomOtpInput from "../../../../components/Inputs/CustomOtpInput/CustomOtpInput";
import { useEffect, useRef, useState } from "react";

function OTP() {
  const [remainingTime, setRemainingTime] = useState(180);
  const intervalRef = useRef();

  useEffect(() => {
    if (remainingTime === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [remainingTime]);

  return (
    <div className="OTP">
      <div className="RightBox" data-aos="fade-up">
        <div className="Info">
          <p>Welcome</p>
          <h1>OTP Verification</h1>
          <p>
            We will send you a one time password on this email address
            Exampel@info.com
          </p>
        </div>
        <div className="FormContent">
          <CustomOtpInput
            name="otp"
            label="Enter Code"
            placeholder="Enter code here"
            required={true}
            numInputs={6}
          />

          <button
            type="button"
            className="ForgotPasswordLink"
            disabled={remainingTime > 0}
            onClick={() => setRemainingTime(180)}
          >
            Resend The Code
          </button>

          <button type="submit" className="Custom-btn">
            <span>Submit</span>
          </button>

          {remainingTime > 0 && (
            <p className="remaining-time">
              Remaining time: <span>{remainingTime}</span> seconds
            </p>
          )}
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
export default OTP;
