import { useState } from "react";
import FormButton from "../Shared/FormElelments/FormButton";
import image from "../../images/3959915-removebg-preview.png";
import TextFields from "../Shared/FormElelments/TextFields";
import * as l from "./ForgotPasswordElements";
import { toast } from "react-hot-toast";
import axios from "axios";
import PasswordFields from "../Shared/FormElelments/PasswordFields";
const ForgotPassword = () => {
  const [OTP, setOtp] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post("api/v1/auth/otp", { Email }),
        {
          loading: `Sending OTP....`,
          success: (data) => {
            console.log({ data });
            return ` ${data.data?.message} ` || "success";
          },
          error: (err) => `${err.response.data.message}`,
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "1rem",
            zIndex: "99999999",
            width: "fit-content",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const formData = { OTP, Password, ConfirmPassword };
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.patch("api/v1/auth/forgot-password", formData),
        {
          loading: `Loading.....`,
          success: (data) => {
            console.log({ data });
            return ` ${data.data?.message} ` || "success";
          },
          error: (err) => `${err.response.data.message}`,
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "1rem",
            zIndex: "99999999",
            width: "fit-content",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <l.Container>
      <l.Section1>
        <l.HeaderContainer>
          <l.Header>Appointment Scheduling System</l.Header>
        </l.HeaderContainer>
      </l.Section1>
      <l.Section1>
        <l.SectionLeft>
          <l.Image src={image} />
        </l.SectionLeft>
        <l.SectionRight>
          <l.SubHeadingContainer1>
            <l.SubHeading>Forgot Password</l.SubHeading>
          </l.SubHeadingContainer1>
          <l.InputSection1>
            <l.InputFeild>
              <l.Label1>
                <l.LabelText>Email</l.LabelText>
              </l.Label1>
              <TextFields
                Value={Email}
                setValue={setEmail}
                placeholder={"Enter the email"}
              />
            </l.InputFeild>
            <l.ButtonSection1>
              <FormButton text={"Send OTP"} onAction={sendOTP} />
            </l.ButtonSection1>
            <l.InputFeild>
              <l.Label1>
                <l.LabelText>OTP</l.LabelText>
              </l.Label1>
              <TextFields
                Value={OTP}
                setValue={setOtp}
                placeholder={"Enter the OTP"}
              />
            </l.InputFeild>
            <l.InputFeild>
              <l.Label1>
                <l.LabelText>Password</l.LabelText>
              </l.Label1>
              <PasswordFields
                Value={Password}
                setValue={setPassword}
                placeholder={"Enter the password"}
              />
            </l.InputFeild>
            <l.InputFeild>
              <l.Label1>
                <l.LabelText>Confirm Password</l.LabelText>
              </l.Label1>
              <PasswordFields
                Value={ConfirmPassword}
                setValue={setConfirmPassword}
                placeholder={"Re-enter the password"}
              />
            </l.InputFeild>
            <l.ButtonSection1>
            <FormButton text={"Reset Password"} onAction={resetPassword} />
          </l.ButtonSection1>
          </l.InputSection1>
        </l.SectionRight>
      </l.Section1>
      <l.Section2>
        <l.CopyRight>
          <l.Text>All Right Reserved | © Copy Rights 2023</l.Text>
        </l.CopyRight>
      </l.Section2>
    </l.Container>
  );
};

export default ForgotPassword;
