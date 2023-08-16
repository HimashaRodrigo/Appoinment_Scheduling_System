
import "./App.css";
import LoginAndSignupComponent from "./components/LoginandSignUp/LoginandSignUp";
import AuthState from "./Context/Auth/AuthState";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { DashBoardLinks } from "./data/DashBoardLinks";
import AdminProfile from "./pages/Admin/Admin_Profile";
import AdminAddUser from "./pages/Admin/Admin_Add_Users";
import AdminViewUser from "./pages/Admin/Admin_View_User";
import ReceptionistProfile from "./pages/Receptionist/Receptionist_Profile";
import ReceptionistAppoinmentDetails from "./pages/Receptionist/ReceptionistViewAppoinments";
import ReceptionistPlaceAppoinment from "./pages/Receptionist/ReceptionistPlaceAppoinment";
import ConsaltantProfile from "./pages/Consaltant/Consaltant_Profile";
import ConsaltantViewAppoinments from "./pages/Consaltant/Consaltant_View_Appoinments";
import JobSeekerProfile from "./pages/Job-Seeker/Job_Seeker_Profile";
import JobSeekerViewAppoinments from "./pages/Job-Seeker/Job_Seeker_View_Appoinments";
import { Toaster } from "react-hot-toast";
import { BackRoutes } from "./data/BackRoutes";
import AdminJobCategories from "./pages/Admin/Admin_Job_Categories";
import AdminAddJob from "./pages/Admin/Admin_Add_Job_Category";
import ReceptionistConsaltantDetails from "./pages/Receptionist/Receptionist_View_Consaltant_Details";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <AuthState>
      <Fragment>
        <div className="App">
        <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<LoginAndSignupComponent />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>

            {/* ++++++++++++++++++++++++++++++++++++++++++++++ Admin +++++++++++++++++++++++++++++++++++++++++++++ */}
            <Route path="/admin-profile" element={<AdminProfile menuItems={DashBoardLinks[0].Navs}/>}/>
            <Route path="/admin-add-user" element={<AdminAddUser menuItems={DashBoardLinks[0].Navs} backRoutes={BackRoutes[0].link}/>}/>
            <Route path="/admin-view-user" element={<AdminViewUser menuItems={DashBoardLinks[0].Navs} backRoutes={BackRoutes[0].link}/>}/>
            <Route path="/admin-job-categories" element={<AdminJobCategories menuItems={DashBoardLinks[0].Navs} backRoutes={BackRoutes[0].link}/>}/>
            <Route path="/admin-add-job-category" element={<AdminAddJob menuItems={DashBoardLinks[0].Navs} backRoutes={BackRoutes[0].link}/>}/>

            {/* ++++++++++++++++++++++++++++++++++++++++++++++ Receptionist +++++++++++++++++++++++++++++++++++++++++++++ */}
            <Route path="/receptionist-profile" element={<ReceptionistProfile menuItems={DashBoardLinks[1].Navs}/>}/>
            <Route path="/receptionist-appoinments" element={<ReceptionistAppoinmentDetails menuItems={DashBoardLinks[1].Navs}/>}/>
            <Route path="/receptionist-place-appoinment" element={<ReceptionistPlaceAppoinment menuItems={DashBoardLinks[1].Navs}/>}/>
            <Route path="/receptionist-consaltants" element={<ReceptionistConsaltantDetails menuItems={DashBoardLinks[1].Navs}/>}/>

            {/* ++++++++++++++++++++++++++++++++++++++++++++++ Consaltant +++++++++++++++++++++++++++++++++++++++++++++ */}
            <Route path="/consaltant-profile" element={<ConsaltantProfile menuItems={DashBoardLinks[2].Navs}/>}/>
            <Route path="/consaltant-appoinments" element={<ConsaltantViewAppoinments menuItems={DashBoardLinks[2].Navs}/>}/>

            {/* ++++++++++++++++++++++++++++++++++++++++++++++ Job-Seeker +++++++++++++++++++++++++++++++++++++++++++++ */}
            <Route path="/job-seeker-profile" element={<JobSeekerProfile menuItems={DashBoardLinks[3].Navs}/>}/>
            <Route path="/job-seeker-appoinments" element={<JobSeekerViewAppoinments menuItems={DashBoardLinks[3].Navs}/>}/>

          </Routes>
        </div>
      </Fragment>
    </AuthState>
  );
}

export default App;
