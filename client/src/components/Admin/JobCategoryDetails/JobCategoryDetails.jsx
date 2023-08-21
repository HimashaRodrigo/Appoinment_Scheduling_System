import * as l from "./JobCategoryDetailsElements";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import { BsPlusCircleFill } from "react-icons/bs";
const JobCategoryDetails = ({ data }) => {
  const { user } = useAuth();
  return (
    <l.Container>
      <l.NewJob>
        <Link className="btn" to="/admin-add-job-category">
          <l.AddJobBar>
            <l.Icon1>
              <BsPlusCircleFill />
            </l.Icon1>
            <l.Text>Add Job Category</l.Text>
          </l.AddJobBar>
        </Link>
      </l.NewJob>
      <l.JobDetails>
        <l.Table>
          <l.Tr>
            <l.Th>Job Name</l.Th>
            <l.Th>Avg Salary</l.Th>
            <l.Th>Status</l.Th>
            <l.Th></l.Th>
          </l.Tr>
          {data.map((row) => {
            return (
              <l.Tr>
                <l.Td>{row.Name}</l.Td>
                <l.Td>{row.AvgSalary}</l.Td>
                <l.Td>{row.Status}</l.Td>
                {user.Role === "Admin" ? (
                  <Link to={`/admin-job-details/${row.id}`} className="btn">
                    <l.Icon>
                      <AiFillEye />
                    </l.Icon>
                  </Link>
                ) : null}
              </l.Tr>
            );
          })}
        </l.Table>
      </l.JobDetails>
    </l.Container>
  );
};

export default JobCategoryDetails;
