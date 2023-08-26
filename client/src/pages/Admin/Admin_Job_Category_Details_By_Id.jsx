import { useParams } from "react-router-dom";
import JobCategoryDetailsById from "../../components/Admin/JobCategoryDetailsById/JobCategoryDetailsById";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";

const AdminJobCategoryDetailsById = ({menuItems,backRoutes}) => {
    const {id} = useParams();
    const{data,isPending} = useFetch(`/api/v1/job-category/${id}`);
    console.log(data?.data?.jobCategory);
    const jobs = data?.data?.jobCategory;
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <>
                    {isPending && <Spinner/>}
                    {jobs && <JobCategoryDetailsById data={jobs}/>}
                </>
            }/>
        </>
     );
}
 
export default AdminJobCategoryDetailsById;