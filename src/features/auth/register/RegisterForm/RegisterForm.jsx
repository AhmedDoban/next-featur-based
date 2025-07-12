import "./RegisterForm.css";
import Image from "next/image";
import CustomInput from "@/components/Inputs/CustomInput/CustomInput";
import CustomDropdownSelect from "@/components/Inputs/CustomDropdownSelect/CustomDropdownSelect";
import CustomCheckBoxInput from "@/components/Inputs/CustomCheckBoxInput/CustomCheckBoxInput";
import CustomRadioInput from "@/components/Inputs/CustomRadioInput/CustomRadioInput";
import CustomDateInput from "@/components/Inputs/CustomDateInput/CustomDateInput";
import CustomOtpInput from "@/components/Inputs/CustomOtpInput/CustomOtpInput";
import Link from "next/link";
import FormikCustomImageUpload from "@/components/Inputs/CustomImageUpload";
import CustomPhoneInput from "@/components/Inputs/CustomPhoneInput/CustomPhoneInput";

function RegisterForm({ SetStep }) {
  // Sample data for dropdowns
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "eg", label: "Egypt" },
    { value: "ae", label: "UAE" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
  ];

  const skillsOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "php", label: "PHP" },
    { value: "java", label: "Java" },
  ];

  return (
    <div className="RegisterForm OO w600">
      <div className="RightBox" data-aos="fade-up">
        <div className="Info">
          <p>Welcome </p>
          <h1>Create an Account</h1>
          <p>Enter your personal information</p>
        </div>
        <div className="FormContent">
          {/* Basic Text Inputs */}
          <div className="inputs-flex">
            <CustomInput
              name={"first_name"}
              placeholder="Enter your first name"
              label="First Name"
              required={true}
              maxLength={50}
            />
            <CustomInput
              name={"last_name"}
              placeholder="Enter your last name"
              label="Last Name"
              required={true}
              maxLength={50}
            />
          </div>

          <CustomInput
            type={"email"}
            name={"email"}
            placeholder="example@info.com"
            label="Email Address"
            required={true}
            maxLength={100}
          />

          {/* Password Inputs */}
          <CustomInput
            type={"password"}
            name={"password"}
            placeholder="Enter a strong password"
            label="Password"
            required={true}
            maxLength={128}
          />

          <CustomInput
            type={"password"}
            name={"confirm_password"}
            placeholder="Confirm your password"
            label="Confirm Password"
            required={true}
            maxLength={128}
          />
          <CustomPhoneInput
            name="phone"
            label="Phone Number"
            placeholder="Enter phone number"
            required={true}
            showDropdown={true}
          />
          <CustomPhoneInput
            name="phone_w"
            label="Phone Number"
            placeholder="Enter phone number"
            required={true}
            showDropdown={false}
            format={true}
          />

          {/* Date Input */}
          <CustomDateInput
            name={"birth_date"}
            label="Date of Birth"
            required={false}
          />

          {/* Dropdown Selects */}
          <div className="inputs-flex">
            <CustomDropdownSelect
              name={"country"}
              label="Country"
              options={countryOptions}
              placeholder="Select your country"
              required={true}
            />

            <CustomDropdownSelect
              name={"gender"}
              label="Gender"
              options={genderOptions}
              placeholder="Select gender"
              required={false}
            />
          </div>

          {/* Multi-select Dropdown */}
          <CustomDropdownSelect
            name={"skills"}
            label="Skills & Technologies"
            options={skillsOptions}
            placeholder="Select your skills"
            multi={true}
            required={false}
          />

          {/* Radio Input */}
          <CustomRadioInput
            name={"account_type"}
            label="Account Type"
            value={"personal"}
            id={"account_type_personal"}
            required={true}
          />

          {/* Textarea */}
          <CustomInput
            type={"textarea"}
            name={"bio"}
            placeholder="Tell us about yourself..."
            label="Bio"
            required={false}
            maxLength={500}
            showCharCount={true}
          />

          {/* Image Upload */}
          <FormikCustomImageUpload
            name="image"
            label="Upload Image"
            title="Choose Image"
            description="Drag and drop or click to browse"
            accept="image/*"
          />

          {/* Checkbox Inputs */}
          <div className="checkbox-group">
            <CustomCheckBoxInput
              name={"terms_accepted"}
              label="I agree to the Terms of Service and Privacy Policy"
              required={true}
              id={"terms_accepted"}
              value={"accepted"}
            />
            <CustomCheckBoxInput
              name="skills"
              label="Skills"
              value="javascript"
              description="Select your programming skills"
              required={true}
            />
            <CustomCheckBoxInput
              name="agreeToTerms"
              label="Agreement"
              value="yes"
              required={true}
              description="Please read and accept our terms"
            />
          </div>

          {/* OTP Input */}
          <CustomOtpInput
            name={"verification_code"}
            label="Email Verification Code"
            length={6}
            required={false}
          />

          {/* Number Input */}
          <CustomInput
            type={"number"}
            name={"years_experience"}
            placeholder="0"
            label="Years of Experience"
            required={false}
            min={0}
            max={50}
          />

          {/* URL Input */}
          <CustomInput
            type={"url"}
            name={"website"}
            placeholder="https://yourwebsite.com"
            label="Website/Portfolio URL"
            required={false}
            maxLength={200}
          />

          {/* Search Input */}
          <CustomInput
            type={"search"}
            name={"search_interests"}
            placeholder="Search for interests..."
            label="Interests"
            required={false}
            maxLength={100}
          />

          <button type="submit" className="Custom-btn">
            <span>Create an Account</span>
          </button>

          <div className="HaveAccount">
            <span>Already have an account?</span>
            <Link href="/login" className="Custom-btn fit Transparent">
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="leftContent">
        <Image
          src={"/Images/statue.png"}
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
export default RegisterForm;
