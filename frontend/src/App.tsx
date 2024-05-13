import { lazy } from "react";
import MainNavBar from "./components/navbar/MainNavBar";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Profile from "./page/user-profile/Profile";
import ImportSectionClassList from "./page/class-management/ImportSectionClassList";
import ImportStudentList from "./page/ta-information-management/ImportStudentList";
import { Col, Container, Row } from "react-bootstrap";
import Login from "./page/login/Login";
import NotFound from "./page/error/404NotFound";
import Error500 from "./page/error/500Error";
import SectionClassList from "./page/class-management/SectionClassList";
import Welcome from "./page/Welcome";
const StudentSidebar = lazy(() => import("./components/sidebars/StudentSidebar"));
const TeacherSidebar = lazy(() => import("./components/sidebars/TeacherSidebar"));
const AdminSidebar = lazy(() => import("./components/sidebars/AdminSidebar"));
import Loading from "./components/loading/Loading";
import MessagePromt from "./components/promts/MessagePromt";
import AccountMainPage from "./page/admin/account-management/AccountMainPage";
import TARegisterMainPage from "./page/student/TARegisterMainPage";
import { PostLogin } from "./page/login/PostLogin";
import { useEffect, useMemo } from "react";
import TARecruitmentMainPage from "./page/admin/TA-recruitment-management/TARecruitementMainPage";
import { useAppSelector } from "./features/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "./features/slices/authentication.slice";
import { Role } from "./types/user.type";
import "./index.css";
import TAClassList from "./page/ta/TAClassList";


const Layout = () => {
  // const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  const Sidebar = useMemo(() => {
    switch (user?.role) {
      case Role.Student:
        return <StudentSidebar />
      case Role.Teacher:
        return <TeacherSidebar />
      case Role.Admin:
        return <AdminSidebar />
      default:
        return <></>
    }
  }, [user?.role])

  return (
    <>
      <MainNavBar user={user} />
      <Loading />
      <MessagePromt />
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            {Sidebar}
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/ta-information-management">
          <Route path="schedule" element="" />
          <Route path="ta-register" element="" />
          <Route path="class-information" element="" />
          <Route path="ta-register-list" element="" />
          <Route
            path="import-student-list"
            element={<ImportStudentList />}
          />
        </Route>

        <Route path="/ta-information-management" element="">
          <Route
            path="ta-course-information"
            element={<TARecruitmentMainPage />}
          />
          <Route path="feedbacks-ta" element="" />
        </Route>

        <Route path="/task-mission-magagement" element="">
          <Route path="task-mission" element="" />
          <Route path="feedbacks-ta" element="" />
        </Route>

        <Route path="/account-management" element="">
          <Route path="accounts-list" element={<AccountMainPage />} />
        </Route>

        <Route path="/ta-classlist" element="">
          <Route path="task-ta" element={<TAClassList />} />
        </Route>

        <Route path="/class-management" element="">
          <Route path="class-list" element={<SectionClassList />} />
          <Route
            path="import-class-list"
            element={<ImportSectionClassList />}
          />
          <Route path="attendance" element="" />
        </Route>

        <Route path="/ta-management" element="">
          <Route path="ta-register" element={<TARegisterMainPage />} />
        </Route>
        <Route path="/account-management" element="">
          <Route path="accounts-list" element={<AccountMainPage />} />
        </Route>

        <Route path="/feedback-and-statistic" element="">
          <Route path="feedbacks" element="" />
          <Route path="statistic" element="" />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/post-login" element={<PostLogin />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/500" element={<Error500 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
