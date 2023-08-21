import MakeAppoinment from "../../components/Receptionist/MakeAppoinment/MakeAppoinment";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";

const ReceptionistPlaceAppoinment = ({menuItems,backRoutes}) => {
    const {data:jobs ,isPending:isPending1} = useFetch('api/v1/job-category');
    const {data:users, isPending:isPending2} = useFetch('api/v1/user/');
    const JobSeekers = users?.data?.Users[1];
    let filteredConsaltants = [];
    users?.data?.Users[0].map((data)=>{
        if(data.Status !== "Deactive" && data.Role === "Consaltant"){
            filteredConsaltants.push(data);
        }
    })
    const Consaltant = filteredConsaltants;

    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <>
                    {isPending1 && isPending2 && <Spinner/>}
                    {users && jobs && <MakeAppoinment JobSeekers={JobSeekers} Consaltant={Consaltant} jobs={jobs?.data?.jobCategories}/>}
                </>
            }/>
        </>
     );
}
 
export default ReceptionistPlaceAppoinment;