import logo from "./logo.svg";
import "./App.css";
import LoginAndSignupComponent from "./components/LoginandSignUp/LoginandSignUp";
import AuthState from "./Context/Auth/AuthState";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { DashBoardLinks } from "./data/DashBoardLinks";
import AdminProfile from "./pages/Admin/Admin_Profile";

function App() {
  return (
    <AuthState>
      <Fragment>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginAndSignupComponent />}/>
            <Route path="/admin-profile" element={<AdminProfile menuItems={DashBoardLinks[0].Navs}/>}/>
          </Routes>
        </div>
      </Fragment>
    </AuthState>
  );
}

export default App;
