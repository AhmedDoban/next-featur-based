import "./SendEmail.css";
import Image from "next/image";
import CustomInput from "../../../../components/Inputs/CustomInput/CustomInput";

function SendEmail() {
  return (
    <div className="SendEmail">
      <div className="RightBox" data-aos="fade-up">
        <div className="Info">
          <p>Welcome</p>
          <h1>Forgot Password ?</h1>
          <span>We will send you an email to reset your password.</span>
        </div>
        <div className="FormContent">
          <CustomInput
            type="email"
            name="email"
            placeholder="example@info.com"
            label="Email"
            required={true}
          />
          <button type="submit" className="Custom-btn">
            <span>Submit</span>
          </button>
        </div>
      </div>
      <div className="leftContent">
        <Image
          src={"/Images/statue.png"}
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
export default SendEmail;
