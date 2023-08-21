import AllAppoinmentDetails from "../../components/Shared/AppoinmentDetails/AllAppoinmentDetails";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";

const ReceptionistAppoinmentDetails = ({menuItems,backRoutes}) => {
    const{data,isPending} = useFetch('api/v1/appoinment/');
    console.log(data?.data?.Appoinments);
    const appoinments = data?.data?.Appoinments
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <>
                    {isPending && <Spinner/>}
                    {data && <AllAppoinmentDetails data={appoinments}/>}
                </>
            }/>
        </>
     );
}
 
export default ReceptionistAppoinmentDetails;