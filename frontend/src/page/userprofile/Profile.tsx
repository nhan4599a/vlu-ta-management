import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const Profile = () => (
  <div className="d-flex flex-column bd-highlight mt-2">
    <div className="d-flex gap-4 align-items-center mb-5">
      <Image
        src={
          "https://s3-alpha-sig.figma.com/img/959e/2911/450897a3aad953d7a7f05960a296f1e1?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MoEzjg3esONtFpIWVLObmBcvSlHppTyt6GzGlCg46mBTzBdZKGT0pp8q-FeH34S~nxTUIke83eBqUJKI9gZ6Qnc9vrkCFld4W7oy4-WfVlisbGNkBnzjmrWe0z-6DyCXn65jbkXOPIAl3qTRJX9PLYZgGWj~vowkso5hmkC3P5oHZYWo1iW6pvj68vF9UNKDpOCOAYi1j8pJcgz99ZRgHnMFPtiUGXFIDkGisDiUbFYFjpUqFQd6wlCTnn9FbrTzQRN7D-RomUz1VDTcYSTpjjaG0IKxw34RdqQ1ID~2JBkF6tW3Iddl~uX34sP-0vis4b34q6N6ALBEfTPCobiZ7A__"
        }
        alt="UserName profile image"
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
