import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import UserProfile from "../../components/Shared/Userprofile/UserProfile";

const JobSeekerProfile = ({menuItems}) => {
    return ( 
        <DashBoard menuItems={menuItems} rightContainer={
            <UserProfile/>
        }/>
     );
}
 
export default JobSeekerProfile;