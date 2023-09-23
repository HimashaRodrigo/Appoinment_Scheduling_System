import TimePicker from "react-time-picker";
import DropDown from "../FormElelments/DropDown";
import FormButton from "../FormElelments/FormButton";
import TextFields from "../FormElelments/TextFields";
import * as l from "./AppoinmentDetailsByIdElements";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const AppoinmentDetailsById = ({ data }) => {
  console.log(data);
  const Name = data.JobSeekerName;
  const ContactNumber = data.JobSeekerContactNo;
  const Time = data.Time;
  const Date1 = data.Date;
  const Job = data.Job;
  const Consaltant = data.ConsaltantName;
  const { id } = useParams();
  const { user } = useAuth();
  const cancelAppoinment = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.patch(`/api/v1/appoinment/${id}`),
        {
          loading: "Cancelling Appoinment .....",
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
      );
    } catch (error) {}
  };
  const closeAppoinment = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.patch(`/api/v1/appoinment/close/${id}`),
        {
          loading: "Closing Appoinment .....",
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
      );
    } catch (error) {}
  };
  return (
    <l.Container>
      <l.AppoinmentDetailsSection>
        <l.InputFeild1>
          <TextFields Value={Name} />
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields Value={ContactNumber} />
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields Value={Consaltant} />
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields Value={Job} />
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields Value={Time} />
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields Value={Date1} />
        </l.InputFeild1>
        <l.ButtonSection>
          {user.Role === "Consultant" ? (
            <FormButton text={"Finish"} onAction={closeAppoinment} />
          ) : (
            <FormButton text={"Cancel"} onAction={cancelAppoinment} />
          )}
        </l.ButtonSection>
      </l.AppoinmentDetailsSection>
    </l.Container>
  );
};

export default AppoinmentDetailsById;
