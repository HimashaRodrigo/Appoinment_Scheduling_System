import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import UserProfile from "../../components/Shared/Userprofile/UserProfile";

const AdminProfile = ({menuItems}) => {
    return ( 
        <DashBoard menuItems={menuItems} rightContainer={
            <UserProfile/>
        }/>
     );
}
 
export default AdminProfile;