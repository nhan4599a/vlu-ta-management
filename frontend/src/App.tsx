import { useEffect } from "react";
import { Suspense, lazy } from "react";
import {
  Col,
  Container,
  Row,
} from "react-bootstrap";
import MainNavBar from "./components/navbar/MainNavBar";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
const Profile = lazy(() => import("./page/general/user-profile/Profile"));
const ImportSectionClassList = lazy(
  () => import("./page/admin/class-management/ImportSectionClassList")
);
const ImportPassedTrainingTAList = lazy(
  () =>
    import("./page/admin/ta-information-management/ImportPassedTrainingTAList")
);
const Login = lazy(() => import("./page/general/login/Login-test"));
const NotFound = lazy(() => import("./page/general/error/404NotFound"));
const Error500 = lazy(() => import("./page/general/error/500Error"));
const SectionClassList = lazy(
  () => import("./page/admin/class-management/SectionClassList")
);
const Welcome = lazy(() => import("./page/general/Welcome"));
const StudentSidebar = lazy(
  () => import("./components/sidebars/StudentSidebar")
);
const TeacherSidebar = lazy(
  () => import("./components/sidebars/TeacherSidebar")
);
const AdminSidebar = lazy(() => import("./components/sidebars/AdminSidebar"));
import Loading from "./components/loading/Loading";
import MessagePromt from "./components/prompts/MessagePrompt";
const AccountMainPage = lazy(
  () => import("./page/admin/account-management/AccountMainPage")
);
const PostLogin = lazy(() => import("./page/general/login/PostLogin"));
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getCurrentUserInfo, selectIsAuthenticated } from "@redux/slices/authentication.slice";
const TAClassList = lazy(() => import("./page/student/ta/TAClassList"));
import { useAdaptiveRoleComponent } from "./hooks/useAdaptiveRoleComponent";
const BaseClassList = lazy(
  () => import("./page/admin/class-management/BaseClassList")
);
const TARegistrationOverviewList = lazy(
  () =>
    import("./page/admin/TA-recruitment-management/TARegistrationOverviewList")
);
const TARegistrationList = lazy(
  () => import("./page/admin/TA-recruitment-management/TARegistrationList")
);
const TAEligiblePage = lazy(
  () => import("./page/admin/TA-recruitment-management/TAEligiblePage")
);
const AssistantsList = lazy(
  () => import("./page/lecturer/assistant-management/AsssistantsList")
);
const TAFinalPage = lazy(
  () => import("./page/admin/TA-recruitment-management/TAFinalPage")
);
const ClassWithTA = lazy(() => import("./page/lecturer/ClassWithTA"));
const ClassAttendant = lazy(
  () => import("./page/lecturer/class-management/ClassAttendant")
);
const AttendantList = lazy(() => import("./page/student/ta/AttendantList"));
const Feedback = lazy(() => import("./page/admin/feedback-statistic/Feedback"));
const Statistic = lazy(
  () => import("./page/admin/feedback-statistic/Statistic")
);
const StudentApplicationsList = lazy(
  () => import("./page/student/StudentApplicationsList")
);
const SurveyList = lazy(() => import("./page/lecturer/survey/SurveyList"));
const Chat = lazy(() => import("./page/general/chat/Chat"));
import "./index.css";

const Layout = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(getCurrentUserInfo)
    }
  }, [isAuthenticated, dispatch, navigate]);

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
          <Route path="/user-profile/:userId" element={<Profile />} />
          <Route path="/ta-information-management">
            <Route path="teacher" element={<SectionClassList />} />
            <Route path="assistant" element={<TARegistrationOverviewList />} />
            <Route path="eligible" element={<TAEligiblePage />} />
            <Route
              path="assistant/:scheduleId"
              element={<TARegistrationList />}
            />
            <Route
              path="import-passed-asistant-training-list"
              element={<ImportPassedTrainingTAList />}
            />
            <Route path="final" element={<TAFinalPage />} />
          </Route>

          <Route path="/task-mission-management" element="">
            <Route path="attendant" element={<AttendantList />} />
            <Route path="feedbacks-ta" element="" />
          </Route>

          <Route path="/account-management" element="">
            <Route path="accounts-list" element={<AccountMainPage />} />
          </Route>

          <Route path="" element="">
            <Route path="class-with-assistant" element={<ClassWithTA />} />
            <Route
              path="/class-management/assistants"
              element={<ClassWithTA />}
            />
            <Route path="ta-survey" element={<SurveyList />} />
          </Route>

          <Route path="/ta-classlist" element="">
            <Route path="task-ta" element={<TAClassList />} />
          </Route>

          <Route path="" element="">
            <Route path="chat" element={<Chat />} />
          </Route>

          <Route path="/class-management" element="">
            <Route path="class-list" element={<BaseClassList />} />
            <Route
              path="import-class-list"
              element={<ImportSectionClassList />}
            />
            <Route path="attendance" element={<ClassAttendant />} />
            <Route path="assistants/:scheduleId" element={<AssistantsList />} />
          </Route>

          <Route path="/account-management" element="">
            <Route path="accounts-list" element={<AccountMainPage />} />
          </Route>

          <Route path="/feedback-and-statistic" element="">
            <Route path="feedbacks" element={<Feedback />} />
            <Route path="statistic" element={<Statistic />} />
          </Route>
          <Route path="/applications" element={<StudentApplicationsList />} />
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
