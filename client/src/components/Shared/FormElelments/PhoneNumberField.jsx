import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { styled } from "styled-components";

const PhoneInputField = styled(PhoneInput)`
    width: 100%;
    height: 40px;
    border-radius: 50px;
    border: none;
    padding: 0 5%;
    background-color: #dfeefc;
`
const PhoneNumberInputField = ({ placeholder, value, setvalue }) => {
  return (
    <PhoneInputField
      placeholder={placeholder || "Enter the number"}
      value={value}
      onChange={setvalue}
    />
  );
};

export default PhoneNumberInputField;
