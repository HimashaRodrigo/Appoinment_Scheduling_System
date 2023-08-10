import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import UserProfile from "../../components/Shared/Userprofile/UserProfile";

const AdminProfile = () => {
    return ( 
        <DashBoard rightContainer={
            <UserProfile/>
        }/>
     );
}
 
export default AdminProfile;