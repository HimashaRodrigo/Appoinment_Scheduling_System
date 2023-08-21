import TextFields from "../../Shared/FormElelments/TextFields";
import * as l from "./AddJobCategoryElements";
import DropDown from "../../Shared/FormElelments/DropDown";
import HeadingComponent from "../../Shared/FormElelments/Heading";
import FormButton from "../../Shared/FormElelments/FormButton";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
const AddJobCategory = () => {
    const[Name,setName] = useState();
    const[AvgSalary,setAvgSalary] = useState();
    const salaries = ["Rs. 30000 less","Rs. 30000-100000","Rs. 100000-150000","Rs. 150000-300000","Rs. 300000-500000","Rs. 500000 above"]
    const AddJob = async (e)=>{
        e.preventDefault();
        try {
            const formData = { Name, AvgSalary };
      console.log(formData);
      await toast.promise(
        axios.post("/api/v1/job-category", formData),
        {
          loading: "Adding Job.....",
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
        });
        } catch (error) {
            console.log(error.message);
        }
    }
    return ( 
        <l.Container>
      <HeadingComponent text={"Add Job Categories"} />
      <l.Form>
        <l.InputFeild1>
          <TextFields
            Value={Name}
            setValue={setName}
            placeholder={"Enter the job name"}
          />
        </l.InputFeild1>
        <l.InputFeild1>
          <DropDown
            Value={AvgSalary}
            setValue={setAvgSalary}
            menuItems={salaries}
            defaultValue={"30000-100000"}
          />
        </l.InputFeild1>
      </l.Form>
      <l.ButtonSection>
        <FormButton text={"Add"} onAction={AddJob} />
      </l.ButtonSection>
    </l.Container>
     );
}
 
export default AddJobCategory;