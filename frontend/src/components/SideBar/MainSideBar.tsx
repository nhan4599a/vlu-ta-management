import { Accordion, NavLink } from "react-bootstrap";
import "../../index.css";

const MainSideBar = () => {
  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Quản lý thông tin trợ giảng</Accordion.Header>
          <Accordion.Body>
            <NavLink href="">Thời khoá biểu</NavLink>
            <NavLink href="">Đăng ký trợ giảng</NavLink>
            <NavLink href="">Thông tin lớp học</NavLink>
            <NavLink href="">Danh sách đăng ký TA</NavLink>
            <NavLink href="">Import DSSV</NavLink>
          </Accordion.Body>
        </Accordion.Item>        
        <Accordion.Item eventKey="1">
          <Accordion.Header>Quản lý nhiệm vụ trợ giảng</Accordion.Header>
          <Accordion.Body>
            <NavLink href="">Nhiệm vụ</NavLink>
            <NavLink href="">Đánh giá TA</NavLink>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Quản lý lớp học</Accordion.Header>
          <Accordion.Body>
            <NavLink href="">Import DS lớp học phần</NavLink>
            <NavLink href="../../page/ImportSectionClassList.tsx">Điểm danh lớp học phần</NavLink>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Đánh giá - Thống kê</Accordion.Header>
          <Accordion.Body>
            <NavLink href="">Đánh giá</NavLink>
            <NavLink href="">Thống kê</NavLink>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Header>Chat</Accordion.Header>
      </Accordion>
    </>
  );
};
export default MainSideBar;
