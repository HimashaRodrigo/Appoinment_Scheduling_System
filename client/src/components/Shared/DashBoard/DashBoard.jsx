import { Link } from "react-router-dom";
import * as l from "./DashBoardElements.js";
import { CgLogOut } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth.js";
const DashBoard = ({ rightContainer, menuItems, backRoutes }) => {
  const { logout,user } = useAuth();
  const onclick = (link) => {
    if (link === "/") {
      logout();
    }
  };
  console.log(user);
  return (
    <l.Container>
      <l.Body>
        <l.LeftContainer>
          <l.HeadingContainer>
            <l.Heading>The Jobs</l.Heading>
          </l.HeadingContainer>
          <l.Menu>
            {menuItems.map((data) => {
              return (
                <Link className="btn" to={data.link}>
                  <l.MenuItem>
                    <l.Icon>{data.icon}</l.Icon>
                    <l.Option>{data.text}</l.Option>
                  </l.MenuItem>
                </Link>
              );
            })}
          </l.Menu>
          <l.Logout>
            <Link
              to={"/"}
              onClick={() => {
                onclick("/");
              }}
              className="btn"
            >
              <l.MenuItem>
                <l.Icon>
                  <CgLogOut />
                </l.Icon>
                <l.Option>LogOut</l.Option>
              </l.MenuItem>
            </Link>
          </l.Logout>
        </l.LeftContainer>
        <l.RightContainer>
          <l.BackgroundImage></l.BackgroundImage>
          <l.Header>
            <l.UserDetails>
              <Link className="btn" to={backRoutes}>
              <l.Image>
                <l.ProfilePic src={`http://localhost:5000/images/${user?.ProfileImage}`}/>
              </l.Image>
              </Link>
              <l.Details>
                <l.Role>{user.Role}</l.Role>
                <l.Name>{user.Name}</l.Name>
              </l.Details>
            </l.UserDetails>
          </l.Header>
          <l.OptionWindow>{rightContainer}</l.OptionWindow>
          <l.Section2>
            <l.CopyRight>
              <l.Text>All Right Reserved | © Copy Rights 2023</l.Text>
            </l.CopyRight>
          </l.Section2>
        </l.RightContainer>
      </l.Body>
    </l.Container>
  );
};

export default DashBoard;
