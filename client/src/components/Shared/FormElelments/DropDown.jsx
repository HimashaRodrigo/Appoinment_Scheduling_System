import { styled } from "styled-components";
const Select = styled.select`
    width: 110%;
    height: 40px;
    border-radius: 50px;
    border: none;
    padding: 0 5%;
    background-color: #dfeefc;
  `;
const DropDown = ({ placeholder, Value, setValue, menuItems }) => {
  
  console.log(menuItems + "\n" + placeholder);
  return (
    <Select
      placeholder={placeholder || "placeholder"}
      defaultValue={null}
      value={Value}
      onChange={(e) => setValue(e.target.value)}
      required={true}
    >
      {menuItems.map((data)=>{
        return(
            <option value={data}>{data}</option>
        )
      })}
    </Select>
  );
};

export default DropDown;
