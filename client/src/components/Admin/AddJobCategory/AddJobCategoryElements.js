import { styled } from "styled-components";
import { InputFeild } from "../../LoginandSignUp/LoginandSignUpElements";

export const Container = styled.div`
  width: 40%;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 2px 2px 2px #000000ad;
  background-color: #fff;
  margin: 5%;
  padding: 2%;
`;
export const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const InputFeild1 = styled(InputFeild)`
  margin: 3% 0;
`;
export const ButtonSection = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;