import MainSideBar from "../components/SideBar/MainSideBar";
import { Col, Container, Row } from "react-bootstrap";
import "../index.css"
// import MainContent from "../components/SideBar/MainContent";
import ImportSectionClassList from "./ImportSectionClassList";

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <MainSideBar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            {/* <MainContent /> */}
            <ImportSectionClassList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
