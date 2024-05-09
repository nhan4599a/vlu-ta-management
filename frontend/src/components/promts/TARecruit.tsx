import { Button, Form, Modal } from "react-bootstrap";

const TARecruit = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tuyển dụng trợ giảng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="taskname">
            <Form.Label>Môn học:</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Yêu cầu:</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>Đóng</Button>
        <Button onClick={props.onSubmit}>Lưu tin</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TARecruit;
