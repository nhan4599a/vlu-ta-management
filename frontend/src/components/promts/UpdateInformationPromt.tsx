import { Button, Form, Modal } from "react-bootstrap";

const UpdateInformationPromt = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm nhiệm vụ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="taskname">
            <Form.Label>Tên nhiệm vụ:</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Mô tả:</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateInformationPromt;
