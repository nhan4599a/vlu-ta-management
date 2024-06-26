import { Accordion } from "react-bootstrap";
import LinkItem from "../LinkItem";
import "@main/index.css";

const MainSideBar = () => {
  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Quản lý thông tin trợ giảng</Accordion.Header>
          <Accordion.Body>
            <LinkItem to="/ta-information-management/schedule">Thời khoá biểu</LinkItem>
            <LinkItem to="">Đăng ký trợ giảng</LinkItem>
            <LinkItem to="">Thông tin lớp học</LinkItem>
            <LinkItem to="">Danh sách đăng ký TA</LinkItem>
            <LinkItem to="/ta-information-management/import-student-list">Import DSSV</LinkItem>
          </Accordion.Body>
        </Accordion.Item>        
        <Accordion.Item eventKey="1">
          <Accordion.Header>Quản lý nhiệm vụ trợ giảng</Accordion.Header>
          <Accordion.Body>
            <LinkItem to="">Nhiệm vụ</LinkItem>
            <LinkItem to="">Đánh giá TA</LinkItem>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Quản lý lớp học</Accordion.Header>
          <Accordion.Body>
            <LinkItem to="/class-management/class-list">Danh sách lớp học phần</LinkItem>
            <LinkItem to="/class-management/import-class-list">Import DS lớp học phần</LinkItem>
            <LinkItem to="">Điểm danh lớp học phần</LinkItem>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Đánh giá - Thống kê</Accordion.Header>
          <Accordion.Body>
            <LinkItem to="">Đánh giá</LinkItem>
            <LinkItem to="">Thống kê</LinkItem>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Header>Chat</Accordion.Header>
      </Accordion>
    </>
  );
};
export default MainSideBar;
