import { useState } from "react";
import TextFields from "../../Shared/FormElelments/TextFields";
import * as l from "./AddUserElements";
import DropDown from "../../Shared/FormElelments/DropDown";
import HeadingComponent from "../../Shared/FormElelments/Heading";
import FormButton from "../../Shared/FormElelments/FormButton";
import { toast } from "react-hot-toast";
import axios from "axios";
const AddUser = () => {
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");
  const roles = ["Receptionist", "Consaltant"];
  const AddUser = async (e) => {
    e.preventDefault();
    try {
      const formData = { Email, Role };
      console.log(formData);
      await toast.promise(
        axios.post("/api/v1/user/", formData),
        {
          loading: "Adding User.....",
          success: (data) => {
            return `${data.data?.message}` || "success";
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
    } catch (error) {
        console.log(error.message);
    }
  };
  return (
    <l.Container>
      <HeadingComponent text={"Add Users"} />
      <l.Form>
        <l.InputFeild1>
          <TextFields
            Value={Email}
            setValue={setEmail}
            placeholder={"Enter the email"}
          />
        </l.InputFeild1>
        <l.InputFeild1>
          <DropDown
            Value={Role}
            setValue={setRole}
            menuItems={roles}
            defaultValue={"Receptionist"}
          />
        </l.InputFeild1>
      </l.Form>
      <l.ButtonSection>
        <FormButton text={"Add"} onAction={AddUser} />
      </l.ButtonSection>
    </l.Container>
  );
};

export default AddUser;
