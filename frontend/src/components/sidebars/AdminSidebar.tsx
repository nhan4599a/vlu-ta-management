import { Accordion } from "react-bootstrap";
import "../../index.css";
import LinkItem from "../LinkItem";
import adminListItemData from "../../store/adminListItemData.json";
import SideBarItemList from "../../types/SideBarItemList";

const renderMenuItem = (item: SideBarItemList) => {
  if (item.children) {
    return (
      <Accordion.Item eventKey={item.title}>
        <Accordion.Header>{item.title}</Accordion.Header>
        <Accordion.Body>{item.children.map(renderMenuItem)}</Accordion.Body>
      </Accordion.Item>
    );
  } else {
    return <LinkItem key={item.title} to={item.path}>{item.title}</LinkItem>;
  }
};

const AdminSidebar = () => (
  <Accordion defaultActiveKey={["0"]} alwaysOpen>
    {adminListItemData.map(renderMenuItem)}
  </Accordion>
);

export default AdminSidebar;
