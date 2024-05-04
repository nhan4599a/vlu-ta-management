import { Col, Form, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const Profile = () => (
  <div className="d-flex flex-column bd-highlight mt-2">
    <div className="d-flex gap-4 align-items-center mb-5">
      <Image
        src={
          "/user-avatar.png"
        }
        alt="User profile image"
        roundedCircle
        style={{ width: "150px" }}
      />
      <h3 className="px-2 text-uppercase">Username</h3>
    </div>
    <Form>
      <Form.Group as={Row} className="mb-3 lead" controlId="fullName">
        <Form.Label column sm="2">
          Họ và tên
        </Form.Label>
        <Col sm="10">
          <Form.Control size="lg" plaintext readOnly defaultValue="Nguyễn Văn A" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 lead" controlId="Email">
        <Form.Label column sm="2">
          Email VLU
        </Form.Label>
        <Col sm="10">
          <Form.Control size="lg" plaintext readOnly defaultValue="email@example.com" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 lead" controlId="Role">
        <Form.Label column sm="2">
          Vai trò
        </Form.Label>
        <Col sm="10">
          <Form.Control size="lg" plaintext readOnly defaultValue="Sinh viên" />
        </Col>
      </Form.Group>
    </Form>
  </div>
);

export default Profile;
