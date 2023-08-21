import { styled } from "styled-components";
import Background_Img from "../../../images/3959915-removebg-preview.png";
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Header = styled.div`
  width: 100%;
  display: flex;
  height: 10%;
  margin-top: 2%;
  justify-content: right;
`;
export const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
`;
export const Image = styled.div`
  display: flex;
  justify-content: center;
`;
export const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #000;
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 0.2rem;
  width: 100%;
`;
export const Role = styled.h3`
  font-weight: 500;
`;
export const Name = styled.p`
  font-size: 12px;
`;
export const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const LeftContainer = styled.div`
  width: 20%;
  background-color: #dfeefc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10% 0 0 0;
  width: 100%;
  height: 10%;
  @media screen and (max-width: 800px) {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
export const Heading = styled.h2`
  background: linear-gradient(
    60deg,
    rgb(255, 157, 56) 0%,
    rgb(255, 204, 63) 50%
  );
  color: transparent;
  font-size: 1rem;
  text-transform: uppercase;
  font-family: "Lato", sans-serif;
  font-weight: 600;
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 0.5rem;
  @media screen and (max-width: 800px) {
    font-size: 24px;
    letter-spacing: 1rem;
  }
`;

export const Menu = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Logout = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuItem = styled.div`
  & {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 5%;
  }
  &:hover {
    cursor: pointer;
  }
`;
export const Icon = styled.div`
  font-size: 32px;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 30%;
`;
export const Option = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;
export const RightContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const BackgroundImage = styled.div`
  background-image: url(${Background_Img});
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  position: absolute;
  width: 80%;
  height: 100%;
  z-index: -1;
`;
export const OptionWindow = styled.div`
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const Section2 = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
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
