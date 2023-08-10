import * as l from "./DashBoardElements.js";
const DashBoard = ({ rightContainer, menuItems }) => {
  return (
    <l.Container>
      <l.Body>
        <l.LeftContainer>
          <l.HeadingContainer>
            <l.Heading>Appointment Scheduling System</l.Heading>
          </l.HeadingContainer>
          <l.Menu>
            {menuItems.map((data) => {
              return (
                <l.MenuItem>
                  <l.Icon>{data.icon}</l.Icon>
                  <l.Option>{data.text}</l.Option>
                </l.MenuItem>
              );
            })}
          </l.Menu>
          <l.Logout>
            <l.MenuItem>
              <l.Icon></l.Icon>
              <l.Option></l.Option>
            </l.MenuItem>
          </l.Logout>
        </l.LeftContainer>
        <l.RightContainer>
          <l.BackgroundImage></l.BackgroundImage>
          <l.Header>
            <l.UserDetails>
              <l.Image>
                <l.ProfilePic/>
              </l.Image>
              <l.Details>
                <l.Role>Admin</l.Role>
                <l.Name>Mr.Silva</l.Name>
              </l.Details>
            </l.UserDetails>
          </l.Header>
          <l.OptionWindow>{rightContainer}</l.OptionWindow>
        </l.RightContainer>
      </l.Body>
    </l.Container>
  );
};

export default DashBoard;
