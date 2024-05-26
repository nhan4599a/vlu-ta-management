import { Suspense, lazy } from "react";
import MainNavBar from "./components/navbar/MainNavBar";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
const Profile = lazy(() => import("./page/general/user-profile/Profile"));
import ImportSectionClassList from "./page/admin/class-management/ImportSectionClassList";
import ImportPassedTrainingTAList from "./page/admin/ta-information-management/ImportPassedTrainingTAList";
import { Col, Container, Row } from "react-bootstrap";
const Login = lazy(() => import("./page/general/login/Login-test"));
import NotFound from "./page/general/error/404NotFound";
import Error500 from "./page/general/error/500Error";
import SectionClassList from "./page/admin/class-management/SectionClassList";
import Welcome from "./page/general/Welcome";
const StudentSidebar = lazy(
  () => import("./components/sidebars/StudentSidebar")
);
const TeacherSidebar = lazy(
  () => import("./components/sidebars/TeacherSidebar")
);
const AdminSidebar = lazy(() => import("./components/sidebars/AdminSidebar"));
import Loading from "./components/loading/Loading";
import MessagePromt from "./components/prompts/MessagePrompt";
import AccountMainPage from "./page/admin/account-management/AccountMainPage";
import { PostLogin } from "./page/general/login/PostLogin";
import { useEffect } from "react";
import { useAppSelector } from "@redux/hooks";
import { selectIsAuthenticated } from "@redux/slices/authentication.slice";
import TAClassList from "./page/student/ta/TAClassList";
import { useAdaptiveRoleComponent } from "./hooks/useAdaptiveRoleComponent";
import { BaseClassList } from "./page/admin/class-management/BaseClassList";
import TARegistrationOverviewList from "./page/admin/TA-recruitment-management/TARegistrationOverviewList";
import { TARegistrationList } from "./page/admin/TA-recruitment-management/TARegistrationList";
import "./index.css";
import TAEligiblePage from "./page/admin/TA-recruitment-management/TAEligiblePage";
import { AssistantsList } from "./page/lecturer/assistant-management/AsssistantsList";
import { TAFinalPage } from "./page/admin/TA-recruitment-management/TAFinalPage";

const Layout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const Sidebar = useAdaptiveRoleComponent({
    0: <StudentSidebar />,
    1: <TeacherSidebar />,
    2: <AdminSidebar />,
    3: <StudentSidebar />,
  });

  return (
    <>
      <MainNavBar />
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
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/ta-information-management">
            <Route path="teacher" element={<SectionClassList />} />
            <Route path="assistant" element={<TARegistrationOverviewList />} />
            <Route path="eligible" element={<TAEligiblePage />} />
            <Route
              path="assistant/:scheduleId"
              element={<TARegistrationList />}
            />
            <Route path="import-passed-asistant-training-list" element={<ImportPassedTrainingTAList />} />
            <Route path="final" element={<TAFinalPage />} />
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
            <Route path="class-list" element={<BaseClassList />} />
            <Route
              path="import-class-list"
              element={<ImportSectionClassList />}
            />
            <Route path="attendance" element="" />
            <Route path="assistants/:scheduleId" element={<AssistantsList />} />
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
    </Suspense>
  );
}

export default App;
