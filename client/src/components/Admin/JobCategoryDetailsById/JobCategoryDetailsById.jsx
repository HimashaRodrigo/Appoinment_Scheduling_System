import { useState } from "react";
import TextFields from "../../Shared/FormElelments/TextFields";
import * as l from "./JobCategoryDetailsByIdElements";
import FormButton from "../../Shared/FormElelments/FormButton";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import RadioButton from "../../Shared/FormElelments/RadioButtons";
import DropDown from "../../Shared/FormElelments/DropDown";

const JobCategoryDetailsById = ({ data }) => {
  const [Name, setName] = useState(data.Name);
  const [AvgSalary, setAvgSalary] = useState(data.AvgSalary);
  const [Status, setStatus] = useState(data.Status);
  const { id } = useParams();
  const salaries = [
    "Rs. 30000 less",
    "Rs. 30000-100000",
    "Rs. 100000-150000",
    "Rs. 150000-300000",
    "Rs. 300000-500000",
    "Rs. 500000 above",
  ];

  const updateJobCategory = async (e) => {
    const formData = { Name, AvgSalary, Status };
    e.preventDefault();
    await toast.promise(
      axios.patch(`/api/v1/job-category/${id}`, formData),
      {
        loading: "Job Category is Updating....",
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
  };
  return (
    <l.Container>
      <l.JobCategoryDetailsSection>
        <l.InputFeild1>
          <TextFields Value={Name} setValue={setName}/>
        </l.InputFeild1>
        <l.InputFeild1>
          <TextFields Value={AvgSalary} setValue={setAvgSalary}/>
        </l.InputFeild1>
        <l.RadioButtonSection>
          <RadioButton
            value={"Available"}
            setValue={setStatus}
            label={"Available"}
            name={"Status"}
            stateVar={Status}
            stateVal={"Available"}
          />
          <RadioButton
            value={"Not Available"}
            setValue={setStatus}
            label={"Not Available"}
            name={"Status"}
            stateVar={Status}
            stateVal={"Not Available"}
          />
        </l.RadioButtonSection>
        <l.ButtonSection>
          <FormButton text={"Update"} onAction={updateJobCategory} />
        </l.ButtonSection>
      </l.JobCategoryDetailsSection>
    </l.Container>
  );
};

export default JobCategoryDetailsById;
