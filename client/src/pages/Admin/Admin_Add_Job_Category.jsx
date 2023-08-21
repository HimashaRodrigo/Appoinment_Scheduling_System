import AddJobCategory from "../../components/Admin/AddJobCategory/AddJobCategory";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";

const AdminAddJob = ({menuItems,backRoutes}) => {
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <AddJobCategory/>
            }/>
        </>
     );
}
 
export default AdminAddJob;