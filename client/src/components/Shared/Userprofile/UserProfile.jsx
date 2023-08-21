import { useState } from "react";
import TextFields from "../FormElelments/TextFields";
import * as l from "./UserProfileElements";
import PhoneNumberInputField from "../FormElelments/PhoneNumberField";
import DropDown from "../FormElelments/DropDown";
import useAuth from "../../../hooks/useAuth";
import { FaCamera } from "react-icons/fa";
import PasswordFields from "../FormElelments/PasswordFields";
import FormButton from "../FormElelments/FormButton";
import axios from "axios";
import { toast } from "react-hot-toast";
import HeadingComponent from "../FormElelments/Heading";
import { Oval } from "react-loader-spinner";
const UserProfile = ({data}) => {
  const { user, loadUser, loading } = useAuth();
  console.log(user);
  const [Email, setEmail] = useState(data.Email);
  const [Name, setName] = useState(data.Name);
  const [ContactNumber, setContactNumber] = useState(data.ContactNumber);
  const [Gender, setGender] = useState(data.Gender);
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const menuItems = ["Male", "Female"];
  
  const [imageName, setImage] = useState(user.ProfileImage);

  const id = user.id;
  const UpdateProfile = async(e)=>{
    e.preventDefault();
    try {
      const formData = {Name, Email, ContactNumber, Gender}
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
  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("image", imageName);
      const res = await axios.patch("api/v1/auth/profile-image", formdata);
      console.log(res);
      loadUser();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

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
  return (
    <l.Container>
      <l.Upper>
        <l.Left>
          <l.ImageSection>
            <l.ImageSubSec>
            {loading && (
                    <Oval
                      height={150}
                      width={150}
                      color="#FFBF00"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#FFBF00ed"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  )}
                  {!loading && user && (
                    <l.Image
                      className="image1"
                      src={`http://localhost:5000/images/${user?.ProfileImage}`}
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
          <l.ButtonSection1>
            <FormButton text={"Upload"} onAction={uploadImage}/>
          </l.ButtonSection1>
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
            <FormButton text={"Update"} onAction={UpdateProfile}/>
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
