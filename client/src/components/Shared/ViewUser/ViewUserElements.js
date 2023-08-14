import { styled } from "styled-components";
import { InputFeild } from "../../LoginandSignUp/LoginandSignUpElements";

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
export const InputFeild1 = styled(InputFeild)`
  margin: 3% 0;
`;
export const ButtonSection = styled.div`
  width: 100%;
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
export const UserDetailsSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
`