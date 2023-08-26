import * as l from "./AllAppoinmentDetailsElements";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import { BsPlusCircleFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
const AllAppoinmentDetails = ({ data }) => {
  const { user } = useAuth();
  return (
    <l.Container>
      {user.Role === "Receptionist" ? (
        <l.NewJob>
          <Link className="btn" to="/receptionist-place-appoinment">
            <l.AddJobBar>
              <l.Icon1>
                <BsPlusCircleFill />
              </l.Icon1>
              <l.Text>Make An Appoinment</l.Text>
            </l.AddJobBar>
          </Link>
        </l.NewJob>
      ) : null}
      <l.JobDetails>
        <l.Table>
          <l.Tr>
            <l.Th>Appoinment No</l.Th>
            <l.Th>Date</l.Th>
            <l.Th>Time</l.Th>
            <l.Th>Consaltant</l.Th>
            <l.Th>Client</l.Th>
            <l.Th>Job</l.Th>
            <l.Th>Status</l.Th>
            <l.Th></l.Th>
          </l.Tr>
          {data.map((row) => {
            return (
              <l.Tr>
                <l.Td>{row.AppoinmentNo}</l.Td>
                <l.Td>{row.Date}</l.Td>
                <l.Td>{row.Time}</l.Td>
                <l.Td>{row.ConsaltantEmail}</l.Td>
                <l.Td>{row.JobSeekerName}</l.Td>
                <l.Td>{row.Job}</l.Td>
                <l.Td>{row.Status}</l.Td>
                {user.Role === "Receptionist" ? (
                  <Link
                    to={`/receptionist-appoinments/${row.id}`}
                    className="btn"
                  >
                    <l.Icon>
                      <AiFillEye />
                    </l.Icon>
                  </Link>
                ) : user.Role === "Consaltant" ? (
                  <Link
                    to={`/consaltant-appoinments/${row.id}`}
                    className="btn"
                  >
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

export default AllAppoinmentDetails;
