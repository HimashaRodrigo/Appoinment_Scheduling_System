import { useState } from "react";
import TextFields from "../FormElelments/TextFields";
import * as l from "./ViewUserElements";
import DropDown from "../FormElelments/DropDown";
import FormButton from "../FormElelments/FormButton";
import RadioButton from "../FormElelments/RadioButtons";
import { toast } from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
const ViewUser = ({ data1 }) => {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Status, setStatus] = useState();
  const [Gender, setGender] = useState();
  const [ContactNumber, setContactNumber] = useState();
  const [Role, setRole] = useState();

  const { user } = useAuth();

  const menuValues = ["Receptionist", "Consultant", "Job Seeker", "Admin"];
  const handleEmailChange = (event) => {
    const userEmail = event.target.value;
    setEmail(userEmail);

    data1.map((user) => {
      console.log(userEmail);
      console.log(user.Email);
      if (user.Email === userEmail) {
        console.log(user);
        setName(user.Name);
        setContactNumber(user.ContactNumber);
        setRole(user.Role);
        setGender(user.Gender);
        setStatus(user.Status);
      } else {
        console.log("NO Such Kind Of User");
      }
    });
  };
  const UpdateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = { Email, Name, Gender, ContactNumber, Role, Status };
      await toast.promise(
        axios.patch("api/v1/user/", formData),
        {
          loading: "User is Updating....",
          success: (data) => {
            return ` ${data.data?.message} ` || "success";
          },
          error: (err) => `${err.response.data.message}`,
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "1rem",
            zIndex: "99999999",
          },
        }
      );
    } catch (error) {}
  };
  return (
    <l.Container>
      <l.SearchFieldSection>
        <l.Searchbar
          type="search"
          placeholder="Enter the User email"
          onChange={handleEmailChange}
        />
      </l.SearchFieldSection>
      <l.UserDetailsSection>
        <l.InputFeild1>
          <TextFields Value={Email} setValue={setEmail} placeholder={"Email"} />
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields Value={Name} setValue={setName} placeholder={"Name"} />
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields
            Value={ContactNumber}
            setValue={setContactNumber}
            placeholder={"Contact Number"}
          />
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields
            Value={Gender}
            setValue={setGender}
            placeholder={"Gender"}
          />
        </l.InputFeild1>
        <l.InputFeild1>
          {user.Role !== "Admin" ? (
            <TextFields Value={Role} placeholder={"Role"} />
          ) : (
            <DropDown
              Value={Role}
              setValue={setRole}
              menuItems={menuValues}
              defaultValue={Role}
            />
          )}
        </l.InputFeild1>
        {user.Role == "Admin" ? (
          <l.RadioButtonSection>
            <RadioButton
              value={"Active"}
              setValue={setStatus}
              label={"Active"}
              name={"Status"}
              stateVar={Status}
              stateVal={"Active"}
            />
            <RadioButton
              value={"Deactive"}
              setValue={setStatus}
              label={"Deactive"}
              name={"Status"}
              stateVar={Status}
              stateVal={"Deactive"}
            />
          </l.RadioButtonSection>
        ) : (
          <l.InputFeild1>
            <TextFields Value={Status} placeholder={"Account Status"} />
          </l.InputFeild1>
        )}
        {user.Role === "Admin" ? (
          <l.ButtonSection>
            <FormButton text={"Update"} onAction={UpdateUser} />
          </l.ButtonSection>
        ) : null}
      </l.UserDetailsSection>
    </l.Container>
  );
};

export default ViewUser;
