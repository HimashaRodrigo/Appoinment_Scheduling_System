import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import UserProfile from "../../components/Shared/Userprofile/UserProfile";
import useFetch from "../../hooks/useFetch";

const AdminProfile = ({menuItems}) => {
    const {data,isPending} = useFetch('api/v1/auth/current-user');
    console.log(data?.user);
    return ( 
        <DashBoard menuItems={menuItems} rightContainer={
           <>
            {isPending && <Spinner/>}
            {data &&  <UserProfile data={data?.user}/>}
           </>
        }/>
     );
}
 
export default AdminProfile;