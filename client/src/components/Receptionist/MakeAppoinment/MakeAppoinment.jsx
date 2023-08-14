import { useState } from "react";
import HeadingComponent from "../../Shared/FormElelments/Heading";
import TextFields from "../../Shared/FormElelments/TextFields";
import * as l from "./MakeAppoinmentElements";
import FormButton from "../../Shared/FormElelments/FormButton";
import PhoneNumberInputField from "../../Shared/FormElelments/PhoneNumberField";
import { toast } from "react-hot-toast";
import TimePicker from 'react-time-picker';
import DropDown from "../../Shared/FormElelments/DropDown";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const MakeAppoinment = ({JobSeekers, Consaltant, jobs}) => {
  const [Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [ContactNumber, setContactNumber] = useState();
  const [Time, setTime] = useState();
  const [Date, setDate] = useState();
  const [Gender, setGender] = useState();
  const [Job, setJob] = useState();
  const [ConsaltantName, setConsaltantName] = useState();

  const JobNames = [];
  jobs.map((job)=>{
    JobNames.push(job.Name);
  })

  let Consaltants = [];
  Consaltant.map((data)=>{
    Consaltants.push(data.Name);
  })

  const genderMenu = ["Male","Female"];
  const handleContactNumberChange = (event) => {
    const userContactNumber = event.target.value;
    const modifyContactNumber = "+94"+userContactNumber.substring(1);
    setContactNumber(modifyContactNumber);
   JobSeekers.map( (user) => {
      if (user.ContactNumber === modifyContactNumber) {
        setName(user.Name);
        setContactNumber(user.ContactNumber);
        setEmail(user.Email);
        setGender(user.Gender);
      } else {
        console.log("error");
      }
    });
  };
  const getConsaltantEmail = Consaltant.map((data)=>{
    if(ConsaltantName === data.Name){
        return data.Email;
    }
})
    const DateModified = Date.toISOString().substring(0,10);
  const makeAppoinment = async(e)=>{
    e.preventDefault();
    try {
        const formData = {Consaltant:getConsaltantEmail[0],Name:Name,Email:Email,ContactNumber:ContactNumber,Time:Time,Date:DateModified,Job:Job,Gender:Gender};
        console.log(formData);
        await toast.promise(
            axios.post('api/v1/appoinment',formData),
            {
                loading: "Making Appoinment .....",
                success: (data) => {
                    return `${data.data?.message}` || "success";
                  },
                error: (err) => {
                  if (!err?.response?.data?.message) {
                    return "Something went wrong! Try again";
                  }
                  return `${err?.response?.data?.message}`;
                },
              },
              {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                  fontSize: "1rem",
                },
              }
        )
    } catch (error) {
        
    }
  }
  return (
    <l.Container>
      <HeadingComponent text={"Make an appoinment"} />
      <l.SearchFieldSection>
        <l.Searchbar
          type="search"
          placeholder="Enter the Contact Number"
          onChange={handleContactNumberChange}
        />
      </l.SearchFieldSection>
      <l.DetailsSection>
        <l.Left>
          <l.InputField1>
            <TextFields Value={Name} setValue={setName} placeholder={"Enter the name"}/>
          </l.InputField1>
          <l.InputField1>
            <TextFields Value={Email} setValue={setEmail} placeholder={"Enter the email"}/>
          </l.InputField1>
          <l.InputField1>
            <PhoneNumberInputField value={ContactNumber} setvalue={setContactNumber} placeholder={"Enter the contact number"}/>
          </l.InputField1>
          <l.InputField1>
            <TimePicker onChange={setTime} value={Time} clockIcon={null} clearIcon={null} hourPlaceholder="hh" minutePlaceholder="mm" secondPlaceholder="ss"/>
          </l.InputField1>
        </l.Left>
        <l.Right>
          <l.InputField1>
            <DropDown Value={Job} setValue={setJob} menuItems={JobNames}/>
          </l.InputField1>
          <l.InputField1>
            <DropDown Value={Gender} setValue={setGender} menuItems={genderMenu}/>
          </l.InputField1>
          <l.InputField1>
            <l.DatePickerField selected={Date} onChange={(date) => setDate(date)} placeholderText="Choose a date"/>
          </l.InputField1>
          <l.InputField1>
            <DropDown Value={ConsaltantName} setValue={setConsaltantName} menuItems={Consaltants} placeholder={"Select a consaltant"}/>
          </l.InputField1>
        </l.Right>
      </l.DetailsSection>
      <l.ButtonSection>
        <FormButton text={"Make Appoinment"} onAction={makeAppoinment}/>
      </l.ButtonSection>
    </l.Container>
  );
};

export default MakeAppoinment;
