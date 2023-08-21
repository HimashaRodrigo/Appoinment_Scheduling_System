
import AddUser from "../../components/Admin/AddUser/AddUser";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";

const AdminAddUser = ({menuItems,backRoutes}) => {
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <AddUser/>
            }/>
        </>
     );
}
 
export default AdminAddUser;