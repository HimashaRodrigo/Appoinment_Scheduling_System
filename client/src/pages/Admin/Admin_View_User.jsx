import ViewUser from "../../components/Shared/ViewUser/ViewUser";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";

const AdminViewUser = ({menuItems,backRoutes}) => {
    const {data,isPending} = useFetch('api/v1/user/');
    let data1 = [];
    data?.data?.Users[0].map((data)=>{
        data1.push(data);
    });
    data?.data?.Users[1].map((data)=>{
        data1.push(data);
    });
    console.log(data1);
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