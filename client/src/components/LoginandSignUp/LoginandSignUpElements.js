import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Section1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const SectionLeft = styled.div`
  width: 70%;
  height: 100%;
`;
export const Image = styled.img`
  width: 100%;
`;
export const SectionRight = styled.div`
  width: 50%;
  height: 100%;
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1% 0 0 0;
  width: 100%;
  @media screen and (max-width: 800px) {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
export const Header = styled.h2`
  background: linear-gradient(
    60deg,
    rgb(255, 157, 56) 0%,
    rgb(255, 204, 63) 50%
  );
  color: transparent;
  font-size: 2rem;
  text-transform: uppercase;
  font-family: "Lato", sans-serif;
  font-weight: 600;
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 1rem;
  @media screen and (max-width: 800px) {
    font-size: 24px;
    letter-spacing: 1rem;
  }
`;
export const SubHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  line-height: 0;
`;
export const SubHeadingContainer1 = styled(SubHeadingContainer)`
  margin-top: -2%;
`
export const SubHeading = styled.p`
  color: #000000;
  font-size: 28px;
  font-weight: 500;
`;
export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const InputSection1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;
export const Left = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Right = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const InputFeild = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
`;
export const Label = styled.div`
  color: #454555;
  display: flex;
  width: 100%;
  justify-content: left;
`;
export const Label1 = styled(Label)`
  margin: 0;
  line-height: 0;
`;
export const LabelText = styled.p`
  color: #454555;
  font-size: 16px;
  font-weight: 500;
`;
export const Select = styled.select`
   width: 110%;
   height: 40px;
  border-radius: 50px;
  border: none;
  padding: 0 5%;
  background-color: #DFEEFC;
`;

export const FrogotPassword = styled.div`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const P1 = styled.p`
  color: #FF9D38;
`;
export const ButtonSection = styled.div`
  width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const ButtonSection1 = styled(ButtonSection)`
  margin-top: 2%;
    
`;

export const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const P2 = styled.p`
  color: #454555;
`;
export const SignUpandLoginLink = styled.a`
  & {
    color: #FF9D38;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const Section2 = styled(Section1)`
  justify-content: center;
`;
export const CopyRight = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const Text = styled.p`
  color: #454555;
  margin: 0;
`;
