import { styled } from "styled-components";
import { InputFeild } from "../../LoginandSignUp/LoginandSignUpElements";

export const Container = styled.div`
  width: 70%;
  height: fit-content;
  border-radius: 2%;
  box-shadow: 2px 2px 2px #000000ad;
  background-color: #fff;
  margin: 5%;
  padding: 2%;
`;
export const Upper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  flex-direction: column;
`;
export const ImageSection = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  margin: 5%;
  flex-direction: column;
  align-items: flex-end;
`;
export const ImageSubSec = styled.div`
  width: 160px;
  height: 160px;
  margin: 5%;
  border: 2px solid #fff;
  border-radius: 50%;
  background-color: #dfeefc;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Image = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
`;
export const Icon = styled.label`
  & {
    width: fit-content;
    height: fit-content;
    border-radius: 50px;
    background-color: #ffbf00;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    padding: 5%;
    position: relative;
    top: -25%;
    left: 0%;
    color: #fff;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  flex-direction: column;
`;
export const InputFeild1 = styled(InputFeild)`
  margin: 3% 0;
`;
export const Lower = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


export const ResetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const ButtonSection = styled.div`
  width: 100%;
  position: relative;
  right: 15%;
  height: 40px;
  display: flex;
  justify-content: right;
  align-items: center;
`;
