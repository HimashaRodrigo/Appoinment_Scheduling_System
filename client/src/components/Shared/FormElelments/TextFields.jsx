import { styled } from "styled-components";
const TextFeild = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 50px;
  border: none;
  padding: 0 5%;
  background-color: #dfeefc;
`;
const TextFields = ({ placeholder, Value, setValue, required, disabled }) => {
  return (
    <TextFeild
      required={required}
      type={"text"}
      value={Value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder || "placeholder"}
      disabled = {false || disabled}
    />
  );
};

export default TextFields;
