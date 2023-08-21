import ViewUser from "../../components/Shared/ViewUser/ViewUser";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";

const AdminViewUser = ({menuItems,backRoutes}) => {
    const {data,isPending} = useFetch('api/v1/user/');
    const data1 = data?.data?.Users[0];
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <>
                    {isPending && <Spinner/>}
                    {data && <ViewUser data1={data1}/>}
                </>
            }/>
        </>
     );
}
 
export default AdminViewUser;