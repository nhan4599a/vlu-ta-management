import { Button, Modal } from "react-bootstrap";
import LinkItem from "../LinkItem";

const ImportSuccessPrompt = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <p>Import danh sách thành công</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          <LinkItem to={"/class-management/class-list"}>Xem danh sách</LinkItem>
        </Button>
        <Button variant="primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportSuccessPrompt;
