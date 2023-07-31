import { styled } from "styled-components";
const PasswordFeild = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 50px;
    border: none;
    padding: 0 5%;
    background-color: #dfeefc;
  `;
const PasswordFields = ({ placeholder, Value, setValue, required }) => {
  
  return (
    <PasswordFeild
      required={required}
      type="password"
      value={Value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder || "placeholder"}
    />
  );
};

export default PasswordFields;
