import JobCategoryDetails from "../../components/Admin/JobCategoryDetails/JobCategoryDetails";
import DashBoard from "../../components/Shared/DashBoard/DashBoard";
import Spinner from "../../components/Shared/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";

const AdminJobCategories = ({menuItems,backRoutes}) => {
    const{data,isPending} = useFetch('api/v1/job-category');
    console.log(data?.data?.jobCategories);
    const jobs = data?.data?.jobCategories;
    return ( 
        <>
            <DashBoard menuItems={menuItems} backRoutes={backRoutes} rightContainer={
                <>
                    {isPending && <Spinner/>}
                    {jobs && <JobCategoryDetails data={jobs}/>}
                </>
            }/>
        </>
     );
}
 
export default AdminJobCategories;