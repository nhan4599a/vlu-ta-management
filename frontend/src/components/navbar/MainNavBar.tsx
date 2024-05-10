import { Navbar, Image, NavDropdown, Nav, DropdownDivider } from "react-bootstrap";
import LinkItem from "../LinkItem";
import { IUser } from "../../types/user.type";

const UserMenu = (
  <Image
    src={
      "/images/user-avatar.png"
    }
    alt="UserName profile image"
    roundedCircle
    style={{ width: "60px" }}
  />
);

type NavBarProps = {
  user?: IUser
}

const MainNavBar = ({ user }: NavBarProps) => {
  return (
    <Navbar expand="lg" className="px-4 justify-content-between">
      <Navbar.Brand>
        <LinkItem to="/">
          <Image
            src={
              "https://cdn.haitrieu.com/wp-content/uploads/2022/12/Logo-Dai-Hoc-Van-Lang-H.png"
            }
            alt="UserName profile image"
            style={{ width: "250px" }}
          />
        </LinkItem>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <h5 className="px-2">{user?.name}</h5>
        <Nav className="user-action">
          <NavDropdown align="end" title={UserMenu}>
            <NavDropdown.Item>
              <LinkItem to="/user-profile">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.195 4.22756L27.5424 9.21845M8.49999 8.00047H2.875C2.37772 8.00047 1.9008 8.18484 1.54917 8.51302C1.19754 8.84121 1 9.28632 1 9.75043V27.25C1 27.7142 1.19754 28.1593 1.54917 28.4874C1.9008 28.8156 2.37772 29 2.875 29H23.5C23.9972 29 24.4741 28.8156 24.8258 28.4874C25.1774 28.1593 25.375 27.7142 25.375 27.25V19.3752M29.8918 2.03311C30.2431 2.36089 30.5218 2.75005 30.712 3.17838C30.9021 3.6067 31 4.06579 31 4.52943C31 4.99306 30.9021 5.45215 30.712 5.88048C30.5218 6.3088 30.2431 6.69797 29.8918 7.02575L17.0593 19.0025L10.375 20.2502L11.7119 14.0116L24.5443 2.03486C24.8952 1.7068 25.312 1.44655 25.7708 1.26897C26.2296 1.0914 26.7214 1 27.2181 1C27.7148 1 28.2066 1.0914 28.6653 1.26897C29.1241 1.44655 29.5409 1.7068 29.8918 2.03486V2.03311Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Xem hồ sơ
              </LinkItem>
            </NavDropdown.Item>
            <DropdownDivider />
            <NavDropdown.Item href="/">
              <svg
                width="15"
                height="15"
                viewBox="0 0 27 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.8571 1H4.57143C3.62423 1 2.71582 1.26925 2.04605 1.7485C1.37627 2.22776 1 2.87778 1 3.55556V21.4444C1 22.1222 1.37627 22.7722 2.04605 23.2515C2.71582 23.7308 3.62423 24 4.57143 24H18.8571M26 12.5L18.8571 7.38889M26 12.5L18.8571 17.6111M26 12.5H8.14286"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Đăng xuất
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavBar;
