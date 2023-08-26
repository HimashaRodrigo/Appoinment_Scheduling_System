import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import ViewUser from "../../components/Shared/ViewUser/ViewUser";
import useFetch from "../../hooks/useFetch";

const ReceptionistConsaltantDetails = ({menuItems,backRoutes}) => {
    const {data,isPending} = useFetch('api/v1/user/');
    let filteredConsaltants = [];
    data?.data?.Users[0].map((data)=>{
        if(data.Role === "Consaltant"){
            filteredConsaltants.push(data);
        }
    })
    const Consaltant = filteredConsaltants;
    console.log(Consaltant);
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <>
                    {isPending && <Spinner/>}
                    {data && <ViewUser data1={Consaltant}/>}
                </>
            }/>
        </>
     );
}
 
export default ReceptionistConsaltantDetails;