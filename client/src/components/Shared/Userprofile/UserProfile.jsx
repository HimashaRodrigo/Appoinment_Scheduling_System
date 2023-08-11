import { useState } from "react";
import TextFields from "../FormElelments/TextFields";
import * as l from "./UserProfileElements";
import PhoneNumberInputField from "../FormElelments/PhoneNumberField";
import DropDown from "../FormElelments/DropDown";
import ClipLoader from "react-spinners/ClipLoader";
import useAuth from "../../../hooks/useAuth";
import { FaCamera } from "react-icons/fa";
import PasswordFields from "../FormElelments/PasswordFields";
import FormButton from "../FormElelments/FormButton";
import axios from "axios";
import { toast } from "react-hot-toast";
import HeadingComponent from "../FormElelments/Heading";
const UserProfile = () => {
  const { user, loadUser, loading } = useAuth();
  console.log(user);
  const [Email, setEmail] = useState(user.Email);
  const [Name, setName] = useState(user.Name);
  const [ContactNumber, setContactNumber] = useState(user.ContactNumber);
  const [Gender, setGender] = useState(user.Gender);
  const Status = "Active";
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const menuItems = ["Male", "Female"];
  
  const [image, setImage] = useState(user.ProfileImage);
  const [click, setClick] = useState(false);

  
  const id = user.id;
  const UpdateProfile = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image",image);
      formData.append("Name",Name);
      formData.append("Email",Email);
      formData.append("ContactNumber",ContactNumber);
      formData.append("Gender",Gender);
      console.log(formData);
      await toast.promise(
        axios.patch(`/api/v1/user/${id}`, formData),
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
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleUpload = (e) => {
    setImage(e.target.files[0]);
    setClick(true);
  };
  console.log(image);
  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      const data = { CurrentPassword, NewPassword, ConfirmPassword };
      console.log(data);
      await toast.promise(
        axios.patch("api/v1/auth/password-reset", data),
        {
          loading: `Updating Password....`,
          success: (data) => {
            loadUser();
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
  console.log(Gender);
  return (
    <l.Container>
      <l.Upper onSubmit={UpdateProfile}>
        <l.Left>
          <l.ImageSection>
            <l.ImageSubSec>
              {click ? (
                <l.Image src={URL.createObjectURL(image)} />
              ) : (
                <l.Image
                  src={`https://localhost:5000/images/${image}`}
                />
              )}
            </l.ImageSubSec>
            <l.Icon>
              <FaCamera />
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleUpload}
              />
            </l.Icon>
          </l.ImageSection>
        </l.Left>
        <l.Right>
          <l.InputFeild1>
            <TextFields
              Value={Email}
              placeholder={"Enter the email"}
              setValue={setEmail}
            />
          </l.InputFeild1>
          <l.InputFeild1>
            <TextFields
              Value={Name}
              placeholder={"Enter the name"}
              setValue={setName}
            />
          </l.InputFeild1>
          <l.InputFeild1>
            <PhoneNumberInputField
              placeholder={"Enter the contact number"}
              value={ContactNumber}
              setvalue={setContactNumber}
            />
          </l.InputFeild1>
          <l.InputFeild1>
            <DropDown
              defaultValue={"Male"}
              placeholder={"Select gender"}
              Value={Gender}
              setValue={setGender}
              menuItems={menuItems}
            />
          </l.InputFeild1>
          <l.ButtonSection>
            <FormButton text={"Update"}/>
          </l.ButtonSection>
        </l.Right>
      </l.Upper>
      <l.Lower>
      <HeadingComponent text={"Password Reset"}/>
        <l.ResetContainer>
          <l.Left>
            <l.InputFeild1>
              <PasswordFields
                Value={CurrentPassword}
                setValue={setCurrentPassword}
                placeholder={"Enter the current password"}
              />
            </l.InputFeild1>
            <l.InputFeild1>
              <PasswordFields
                Value={NewPassword}
                setValue={setNewPassword}
                placeholder={"Enter the new password"}
              />
            </l.InputFeild1>
          </l.Left>
          <l.Right>
            <l.InputFeild1>
              <PasswordFields
                Value={ConfirmPassword}
                setValue={setConfirmPassword}
                placeholder={"Re-enter the new password"}
              />
            </l.InputFeild1>
            <l.ButtonSection>
              <FormButton text={"Reset"} onAction={ResetPassword} />
            </l.ButtonSection>
          </l.Right>
        </l.ResetContainer>
      </l.Lower>
    </l.Container>
  );
};

export default UserProfile;
