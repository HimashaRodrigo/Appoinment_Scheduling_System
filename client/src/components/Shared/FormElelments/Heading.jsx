import { styled } from "styled-components";

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 10%;
  @media screen and (max-width: 800px) {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;
const Heading = styled.h2`
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
const HeadingComponent = ({text}) => {
    return ( 
        <HeadingContainer>
            <Heading>{text}</Heading>
        </HeadingContainer>
     );
}
 
export default HeadingComponent;