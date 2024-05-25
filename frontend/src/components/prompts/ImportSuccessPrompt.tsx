import { Button, Modal, ModalProps } from "react-bootstrap";
import LinkItem from "../LinkItem";

type ImportSuccessPromtProps = ModalProps & {
  url: string
}

const ImportSuccessPrompt = (props: ImportSuccessPromtProps) => {
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
        <p>Import danh sách thành công</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Đóng
        </Button>
        <Button variant="secondary">
          <LinkItem to={props.url}>Xem danh sách</LinkItem>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportSuccessPrompt;
