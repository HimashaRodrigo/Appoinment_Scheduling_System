import { styled } from "styled-components";

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5%;
`;
const Label = styled.div`
  width: 100%;
  text-align: left;
  margin: 3% 0;
  color: #000;
  font-size: 18px;
  font-weight: 600;
`;
const Radio = styled.input``;
const RadioButton = ({label,value,setValue,name,stateVar,stateVal}) => {
  return (
    <RadioButtonContainer>
      <Radio
        type="radio"
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        checked={stateVar === stateVal ? true : false}
      />
      <Label>{label}</Label>
    </RadioButtonContainer>
  );
};

export default RadioButton;
