import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectCurrentUser } from "@redux/slices/authentication.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { updateUser } from "@redux/slices/users.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "");

  const updateButtonClick = () => {
    dispatch(updateUser(phoneNumber))
      .then(unwrapResult)
      .then(() => {
        dispatch(showMessageDialog("Cập nhật thông tin user thành công"));
      });
  };

  const [rating, setRating] = useState(5);

  return (
    <div className="d-flex flex-column bd-highlight mt-2">
      <div className="d-flex gap-4 align-items-center mb-5">
        <Image
          src={"/images/user-avatar.png"}
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
            <Form.Control
              size="lg"
              plaintext
              readOnly
              defaultValue={user?.name}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 lead" controlId="Email">
          <Form.Label column sm="2">
            Email VLU
          </Form.Label>
          <Col sm="10">
            <Form.Control
              size="lg"
              plaintext
              readOnly
              defaultValue={user?.email}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 lead" controlId="mobile">
          <Form.Label column sm="2">
            Số điện thoại
          </Form.Label>
          <Col sm="4">
            <Form.Control
              size="lg"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 lead" controlId="action">
          <Form.Label column sm="2"></Form.Label>
          <Col sm="10">
            <Button variant="primary" onClick={updateButtonClick}>
              Lưu
            </Button>
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 lead d-flex align-items-center"
          controlId="mobile"
        >
          <Form.Label column sm="2">
            Đánh giá
          </Form.Label>
          <Col sm="4">
            <ProgressBar now={rating} label={`${rating}/5`} max={5} />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Profile;
