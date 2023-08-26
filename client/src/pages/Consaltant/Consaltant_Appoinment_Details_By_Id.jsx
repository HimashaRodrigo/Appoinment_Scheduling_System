import { useParams } from "react-router-dom";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import AppoinmentDetailsById from "../../components/Shared/AppoinmentDetailsById/AppoinmentDetailsById";

const ConsaltantAppoinmentDetailsById = ({menuItems,backRoutes}) => {
    const {id} = useParams();
    const{data ,isPending} = useFetch(`/api/v1/appoinment/${id}`);

    const appoinments = data?.data?.Appoinments[0];
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <>
                    {isPending &&  <Spinner/>}
                    {appoinments && <AppoinmentDetailsById data={appoinments}/>}
                </>
            }/>
        </>
     );
}
 
export default ConsaltantAppoinmentDetailsById;