import { Navbar, Image } from "react-bootstrap";
import UserActions from "./UserActions";
import LinkItem from "../LinkItem";

const MainNavBar = () => {
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
      <UserActions />
    </Navbar>
  );
};

export default MainNavBar;
