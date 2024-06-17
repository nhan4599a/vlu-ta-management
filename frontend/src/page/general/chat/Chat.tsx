import {
  Card,
  CardBody,
  Col,
  Container,
  InputGroup,
  Row,
  Image,
  Tab,
  ListGroup,
} from "react-bootstrap";
import "@main/index.css";

const Chat = () => {
  return (
    <Container fluid className="py-2">
      <Row>
        <Col md="12">
          <Card id="chat3" style={{ borderRadius: "15px" }}>
            <CardBody>
              <Col className="mb-4 mb-md-0">
                <div className="p-3">
                  <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#link1"
                  >
                    <Row>
                      <Col sm={4}>
                        <InputGroup className="rounded mb-3">
                          <input
                            className="form-control rounded"
                            placeholder="Search"
                            type="search"
                          />
                          <span
                            className="input-group-text border-0"
                            id="search-addon"
                          >
                            <Image
                              src="images/search-interface-symbol.png"
                              height={20}
                            />
                          </span>
                        </InputGroup>
                        <ListGroup className="conversations">
                          <ListGroup.Item action href="#link1">
                            <a
                              href="#!"
                              className="d-flex justify-content-between"
                            >
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="avatar"
                                    className="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span className="badge bg-success badge-dot"></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">Marie Horwitz</p>
                                  <p className="small text-muted">
                                    Hello, Are you there?
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  Just now
                                </p>
                                <span className="badge bg-danger rounded-pill float-end">
                                  3
                                </span>
                              </div>
                            </a>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#link2">
                            <a
                              href="#!"
                              className="d-flex justify-content-between"
                            >
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                    alt="avatar"
                                    className="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span className="badge bg-warning badge-dot"></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">Alexa Chung</p>
                                  <p className="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  5 mins ago
                                </p>
                                <span className="badge bg-danger rounded-pill float-end">
                                  2
                                </span>
                              </div>
                            </a>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#link3">
                            <a
                              href="#!"
                              className="d-flex justify-content-between"
                            >
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                    alt="avatar"
                                    className="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span className="badge bg-success badge-dot"></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">Danny McChain</p>
                                  <p className="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  Yesterday
                                </p>
                              </div>
                            </a>
                          </ListGroup.Item>
                          <ListGroup.Item action href="#link4">
                            <a
                              href="#!"
                              className="d-flex justify-content-between"
                            >
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                    alt="avatar"
                                    className="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span className="badge bg-danger badge-dot"></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0">Ashley Olsen</p>
                                  <p className="small text-muted">
                                    Lorem ipsum dolor sit.
                                  </p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1">
                                  Yesterday
                                </p>
                              </div>
                            </a>
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                      <Col sm={8}>
                        <Tab.Content>
                          <Tab.Pane eventKey="#link1">
                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-row justify-content-end">
                              <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat.
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                              <Image
                                src="images/user-avatar.png"
                                roundedCircle
                                height={50}
                                width={50}
                                alt="avatar"
                              />
                            </div>

                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  Duis aute irure dolor in reprehenderit in
                                  voluptate velit esse cillum dolore eu fugiat
                                  nulla pariatur.
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-row justify-content-end">
                              <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                  Excepteur sint occaecat cupidatat non
                                  proident, sunt in culpa qui officia deserunt
                                  mollit anim id est laborum.
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                              <Image
                                src="images/user-avatar.png"
                                roundedCircle
                                height={50}
                                width={50}
                                alt="avatar"
                              />
                            </div>

                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  Sed ut perspiciatis unde omnis iste natus
                                  error sit voluptatem accusantium doloremque
                                  laudantium, totam rem aperiam, eaque ipsa quae
                                  ab illo inventore veritatis et quasi
                                  architecto beatae vitae dicta sunt explicabo.
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-row justify-content-end">
                              <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                  Nemo enim ipsam voluptatem quia voluptas sit
                                  aspernatur aut odit aut fugit, sed quia
                                  consequuntur magni dolores eos qui ratione
                                  voluptatem sequi nesciunt.
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                              <Image
                                src="images/user-avatar.png"
                                roundedCircle
                                height={50}
                                width={50}
                                alt="avatar"
                              />
                            </div>

                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  Neque porro quisquam est, qui dolorem ipsum
                                  quia dolor sit amet, consectetur, adipisci
                                  velit, sed quia non numquam eius modi tempora
                                  incidunt ut labore et dolore magnam aliquam
                                  quaerat voluptatem.
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-row justify-content-end">
                              <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                  Ut enim ad minima veniam, quis nostrum
                                  exercitationem ullam corporis suscipit
                                  laboriosam, nisi ut aliquid ex ea commodi
                                  consequatur?
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                              <Image
                                src="images/user-avatar.png"
                                roundedCircle
                                height={50}
                                width={50}
                                alt="avatar"
                              />
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="#link2">
                            <div className="d-flex flex-row justify-content-end">
                              <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat.
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                              <Image
                                src="images/user-avatar.png"
                                roundedCircle
                                height={50}
                                width={50}
                                alt="avatar"
                              />
                            </div>

                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  Duis aute irure dolor in reprehenderit in
                                  voluptate velit esse cillum dolore eu fugiat
                                  nulla pariatur.
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-row justify-content-end">
                              <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                  Excepteur sint occaecat cupidatat non
                                  proident, sunt in culpa qui officia deserunt
                                  mollit anim id est laborum.
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                              <Image
                                src="images/user-avatar.png"
                                roundedCircle
                                height={50}
                                width={50}
                                alt="avatar"
                              />
                            </div>

                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  Sed ut perspiciatis unde omnis iste natus
                                  error sit voluptatem accusantium doloremque
                                  laudantium, totam rem aperiam, eaque ipsa quae
                                  ab illo inventore veritatis et quasi
                                  architecto beatae vitae dicta sunt explicabo.
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                            </div>

                            <div className="d-flex flex-row justify-content-end">
                              <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                  Nemo enim ipsam voluptatem quia voluptas sit
                                  aspernatur aut odit aut fugit, sed quia
                                  consequuntur magni dolores eos qui ratione
                                  voluptatem sequi nesciunt.
                                </p>
                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                              <Image
                                src="images/user-avatar.png"
                                roundedCircle
                                height={50}
                                width={50}
                                alt="avatar"
                              />
                            </div>

                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  Neque porro quisquam est, qui dolorem ipsum
                                  quia dolor sit amet, consectetur, adipisci
                                  velit, sed quia non numquam eius modi tempora
                                  incidunt ut labore et dolore magnam aliquam
                                  quaerat voluptatem.
                                </p>
                                <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                                  12:00 PM | Aug 13
                                </p>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="#link3"></Tab.Pane>
                          <Tab.Pane eventKey="#link4"></Tab.Pane>
                          <div className="text-muted d-flex justify-content-end align-items-center pe-3 pt-3 mt-2">
                            <Image
                              src="images/user-avatar.png"
                              roundedCircle
                              width={50}
                              alt="avatar"
                            />
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="message"
                              placeholder="Type message"
                            />
                            <a className="ms-1 text-muted" href="#!">
                              <Image src="images/attach-file.png" height={20} />
                            </a>
                            <a className="ms-3 text-muted" href="#!">
                              <Image src="images/happy-face.png" height={20} />
                            </a>
                            <a className="ms-3" href="#!">
                              <Image
                                src="images/send-messenger.png"
                                height={20}
                              />
                            </a>
                          </div>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
