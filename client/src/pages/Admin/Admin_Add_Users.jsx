import DashBoard from "../../components/Shared/DashBoard/DashBoard";

const AdminAddUser = ({menuItems}) => {
    return ( 
        <>
            <DashBoard menuItems={menuItems} rightContainer={
                <p>test</p>
            }/>
        </>
     );
}
 
export default AdminAddUser;