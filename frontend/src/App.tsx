// import Login from './authentication/Login'
import MainNavBar from "./components/MainNavbar/MainNavBar";
import "./index.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Profile from "./page/userprofile/Profile";
import ImportSectionClassList from "./page/classmanagement/ImportSectionClassList";
import ImportStudentList from "./page/tainformationmanagement/ImportStudentList";
import MainSideBar from "./components/SideBar/MainSideBar";
import { Col, Container, Row } from "react-bootstrap";
import Login from "./authentication/Login";
import NotFound from "./page/404NotFound";
import Error500 from "./page/500Error";
import SectionClassList from "./page/classmanagement/SectionClassList";
// import MainSideBar from "./components/SideBar/MainSideBar";


const Layout = () => {
  return (
    <>
      <MainNavBar />
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <MainSideBar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
           <Outlet /> 
          </Col>
        </Row>
      </Container>
    </>
  )
}

function App() {
  return (
    <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<></>} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/ta-information-management">
              <Route path="schedule" element="" />
              <Route path="ta-register" element="" />
              <Route path="class-information" element="" />
              <Route path="ta-register-list" element="" />
              <Route path="import-student-list" element={<ImportStudentList />} />
            </Route>

            <Route path="/task-mission-magagement" element="">
              <Route path="task-mission" element="" />
              <Route path="feedbacks-ta" element="" />
            </Route>

            <Route path="/class-management" element="">
              <Route
                path="class-list"
                element={<SectionClassList />}
              />
              <Route
                path="import-setion-class-list"
                element={<ImportSectionClassList />}
              />
              <Route path="attendance" element="" />
            </Route>

            <Route path="/feedback-and-statistic" element="">
              <Route path="feedbacks" element="" />
              <Route path="statistic" element="" />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
