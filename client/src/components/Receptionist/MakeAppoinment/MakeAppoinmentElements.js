import { styled } from "styled-components";
import { InputFeild } from "../../LoginandSignUp/LoginandSignUpElements";
import DatePicker from "react-datepicker";

export const Container = styled.form`
  width: 70%;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 2px 2px 2px #000000ad;
  background-color: #fff;
  margin: 5%;
  padding: 2%;
  justify-content: center;
  align-items: center;
`;
export const SearchFieldSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`
export const Searchbar = styled.input`
  width: 90%;
  margin-bottom: 5px;
  padding: 6px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  box-shadow: 3px 3px 3px #0000002d;
  background-color: #dfeefc;
`;
export const InputField1 = styled(InputFeild)`
  margin: 3% 0;
  width: 70%;
`;
export const DetailsSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
export const Left = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
`
export const Right = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
`
export const ButtonSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
`
export const DatePickerField = styled(DatePicker)`
    width: 142%;
    height: 40px;
    border-radius: 50px;
    border: none;
    padding: 0 5%;
    background-color: #dfeefc;
`