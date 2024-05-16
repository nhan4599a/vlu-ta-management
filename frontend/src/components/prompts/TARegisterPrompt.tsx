import { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DropzoneComponent, { DropzoneComponentMethodsRef } from "../dropzone/Dropzone";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectCurrentUser } from "@redux/slices/authentication.slice";
import {
  applyRecruiment,
  selectActiveTermName,
  setActiveTermName,
} from "@redux/slices/recruiment.slice";
import "../../index.css";

const TARegisterPrompt = () => {
  const dispatch = useAppDispatch();
  const termName = useAppSelector(selectActiveTermName);
  const user = useAppSelector(selectCurrentUser);

  const [recruitdescription, setRecruitDescription] = useState("");
  const [mobile, setMobile] = useState("");
  const [grade1, setGrade1] = useState<number>();
  const [grade2, setGrade2] = useState<number>();

  const dropzoneRef = useRef<DropzoneComponentMethodsRef>(null)

  const onHide = () => {
    dispatch(setActiveTermName(undefined));
  };

  const onSubmit = async () => {
    if (!dropzoneRef.current) {
      return
    }

    const formData = new FormData()

    const files = dropzoneRef.current.getFiles()
    for (const file of files) {
      formData.append('files', file)
    }
    formData.append('phoneNumber', mobile)
    formData.append('description', recruitdescription)

    await dispatch(applyRecruiment(formData))
    onHide()
  }

  return (
    <Modal
      show={termName !== undefined}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ứng tuyển làm trợ giảng môn {termName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter">
          Yêu cầu tuyển dụng
        </Modal.Title>
        <Form>
          <Form.Group className="my-3" controlId="recruitdescription">
            <Form.Control
              disabled
              defaultValue={recruitdescription}
              as="textarea"
              rows={3}
              onChange={(e) => setRecruitDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Modal.Title id="contained-modal-title-vcenter">
          Đơn ứng tuyển
        </Modal.Title>
        <Form>
          <Form.Group as={Row} className="my-3" controlId="fullName">
            <Form.Label column sm="2">
              Họ và tên
            </Form.Label>
            <Col sm="10">
              <Form.Control disabled defaultValue={user?.name} type="text" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="Email">
            <Form.Label column sm="2">
              Email VLU
            </Form.Label>
            <Col sm="10">
              <Form.Control disabled defaultValue={user?.email} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="studentclass">
            <Form.Label column sm="2">
              Lớp
            </Form.Label>
            <Col sm="10">
              <Form.Control disabled defaultValue={user?.class} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="mobilephone">
            <Form.Label column sm="2">
              Số điện thoại
            </Form.Label>
            <Col sm="10">
              <Form.Control
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="grade1">
            <Form.Label column sm="2">
              Điểm môn 1: 
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                value={grade1}
                onChange={(e) => setGrade1(Number(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="grade2">
            <Form.Label column sm="2">
              Điểm môn 2: 
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                value={grade2}
                onChange={(e) => setGrade2(Number(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="attachment">
            <Form.Label column sm="2">
              File đính kèm
            </Form.Label>
            <Col sm="10">
              <DropzoneComponent ref={dropzoneRef} />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button onClick={onSubmit}>Gửi đơn</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TARegisterPrompt;
