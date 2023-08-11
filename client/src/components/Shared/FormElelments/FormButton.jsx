import { styled } from "styled-components";

const Button = styled.button`
  & {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background-color: #FF9D38;
    color: #fff;
    border: none;
  }
  &:hover {
    cursor: pointer;
  }
`;
const FormButton = ({text,onAction}) => {
    return ( 
        <>
            <Button onClick={onAction}>{text}</Button>
        </>
     );
}
 
export default FormButton;