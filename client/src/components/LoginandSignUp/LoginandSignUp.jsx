import * as l from "./LoginandSignUpElements";
import image from "../../images/3959915-removebg-preview.png";
import { useState } from "react";
import TextFields from "../Shared/FormElelments/TextFields";
import PasswordFields from "../Shared/FormElelments/PasswordFields";
import DropDown from "../Shared/FormElelments/DropDown";
const LoginAndSignupComponent = () => {
  const [change, setChange] = useState(true);
  const[Email,setEmail] = useState("");
  const[Name,setName] = useState("");
  const[ContactNumber,setContactNumber] = useState("");
  const[Gender,setGender] = useState("");
  const[Password,setPassword] = useState("");
  const[ConfirmPassword,setConfirmPassword] = useState("");
  const menuItems = ["Male","Female"];
  const handleChange = () => {
    if (change) {
      setChange(false);
    } else {
      setChange(true);
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
        <>
          {change ? (
            <l.SectionRight style={{marginTop:"5.85%"}}>
              <l.SubHeadingContainer>
                <l.SubHeading>Login</l.SubHeading>
              </l.SubHeadingContainer>
              <l.InputSection>
                <l.InputFeild>
                  <l.Label>
                    <l.LabelText>Email</l.LabelText>
                  </l.Label>
                  <TextFields Value={Email} setValue={setEmail} placeholder={'Enter the email'}/>
                </l.InputFeild>
                <l.InputFeild>
                  <l.Label>
                    <l.LabelText>Password</l.LabelText>
                  </l.Label>
                  <PasswordFields  Value={Password} setValue={setPassword} placeholder={'Enter the password'}/>
                </l.InputFeild>
              </l.InputSection>
              <l.FrogotPassword>
                <l.P1>Forgot Your Password ?</l.P1>
              </l.FrogotPassword>
              <l.ButtonSection>
                <l.Button>Login</l.Button>
              </l.ButtonSection>
              <l.Option>
                <l.P2>
                  Dosen't have an account ?{" "}
                  <l.SignUpandLoginLink onClick={handleChange}>
                    <u>Sign up</u>
                  </l.SignUpandLoginLink>
                </l.P2>
              </l.Option>
            </l.SectionRight>
          ) : (
            <l.SectionRight>
              <l.SubHeadingContainer1>
                <l.SubHeading>Register</l.SubHeading>
              </l.SubHeadingContainer1>
              <l.InputSection1>
                  <l.InputFeild>
                    <l.Label1>
                      <l.LabelText>Name</l.LabelText>
                    </l.Label1>
                    <TextFields Value={Name} setValue={setName} placeholder={'Enter the name'}/>
                  </l.InputFeild>
                  <l.InputFeild>
                    <l.Label1>
                      <l.LabelText>Email</l.LabelText>
                    </l.Label1>
                    <TextFields Value={Email} setValue={setEmail} placeholder={'Enter the email'}/>
                  </l.InputFeild>
                  <l.InputFeild>
                    <l.Label1>
                      <l.LabelText>Contact Number</l.LabelText>
                    </l.Label1>
                    <TextFields Value={ContactNumber} setValue={setContactNumber} placeholder={'Enter the contact number'}/>
                  </l.InputFeild>
                  <l.InputFeild>
                    <l.Label1>
                      <l.LabelText>Gender</l.LabelText>
                    </l.Label1>
                    <DropDown placeholder={'Select gender'} Value={Gender} setValue={setGender} menuItems={menuItems}/>
                  </l.InputFeild>
                  <l.InputFeild>
                    <l.Label1>
                      <l.LabelText>Password</l.LabelText>
                    </l.Label1>
                    <TextFields Value={Password} setValue={setPassword} placeholder={'Enter the password'}/>
                  </l.InputFeild>
                  <l.InputFeild>
                    <l.Label1>
                      <l.LabelText>Confirm Password</l.LabelText>
                    </l.Label1>
                    <TextFields Value={ConfirmPassword} setValue={setConfirmPassword} placeholder={'Re-enter the password'}/>
                  </l.InputFeild>
              </l.InputSection1>
              <l.ButtonSection1>
                <l.Button>Register</l.Button>
              </l.ButtonSection1>
              <l.Option>
                <l.P2>
                  Already have an account ?{" "}
                  <l.SignUpandLoginLink onClick={handleChange}>
                    <u>Login</u>
                  </l.SignUpandLoginLink>
                </l.P2>
              </l.Option>
            </l.SectionRight>
          )}
        </>
      </l.Section1>
      <l.Section2>
        <l.CopyRight>
          <l.Text>All Right Reserved | © Copy Rights 2023</l.Text>
        </l.CopyRight>
      </l.Section2>
    </l.Container>
  );
};

export default LoginAndSignupComponent;
