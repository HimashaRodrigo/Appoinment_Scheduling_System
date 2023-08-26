import { styled } from "styled-components";
import { InputFeild } from "../../LoginandSignUp/LoginandSignUpElements";
import DatePicker from "react-datepicker";

export const Container = styled.div`
  width: 60%;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 2px 2px 2px #000000ad;
  background-color: #fff;
  margin: 5%;
  padding: 2%;
  justify-content: center;
  align-items: center;
`;
export const InputFeild1 = styled(InputFeild)`
  margin: 3% 0;
`;
export const ButtonSection = styled.div`
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
`;
export const RadioButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AppoinmentDetailsSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
`
export const DatePickerField = styled(DatePicker)`
    width: 142%;
    height: 40px;
    border-radius: 50px;
    border: none;
    padding: 0 5%;
    background-color: #dfeefc;
`