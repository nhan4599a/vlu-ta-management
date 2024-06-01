import { Accordion } from "react-bootstrap";
import LinkItem from "../LinkItem";
import teacherListItemData from "@main/store/teacherListItemData.json";
import SideBarItemList from "@main/types/SideBarItemList";
import { useLocation } from "react-router-dom";
import "@main/index.css";

const MenuItem = (item: SideBarItemList) => {
  const location = useLocation();

  if (item.children) {
    return (
      <Accordion.Item eventKey={item.title}>
        <Accordion.Header>{item.title}</Accordion.Header>
        <Accordion.Body>{item.children.map(MenuItem)}</Accordion.Body>
      </Accordion.Item>
    );
  } else {
    return (
      <LinkItem
        key={item.title}
        to={item.path!}
        isActive={location.pathname === item.path}
      >
        {item.title}
      </LinkItem>
    );
  }
};

const TeacherSidebar = () => (
  <Accordion defaultActiveKey={["0"]} alwaysOpen>
    {teacherListItemData.map(MenuItem)}
  </Accordion>
);

export default TeacherSidebar;
