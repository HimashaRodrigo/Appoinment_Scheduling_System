import AllAppoinmentDetails from "../../components/Shared/AppoinmentDetails/AllAppoinmentDetails";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";

const JobSeekerViewAppoinments = ({menuItems,backRoutes}) => {
    const {user} = useAuth();
    const{data,isPending} = useFetch('api/v1/appoinment/');
    const filteredAppoinments = [];
    console.log(user.ContactNumber);
    data?.data?.Appoinments.map((data)=>{
        if(user.ContactNumber === data.JobSeekerContactNo){
            filteredAppoinments.push(data);
        }
    })
    console.log(filteredAppoinments);
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <>
                    {isPending && <Spinner/>}
                    {data && <AllAppoinmentDetails data={filteredAppoinments}/>}
                </>
            }/>
        </>
     );
}
 
export default JobSeekerViewAppoinments;