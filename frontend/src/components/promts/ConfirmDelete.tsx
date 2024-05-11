import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmDelete = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Xác nhận
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
            Bạn có muốn xóa người dùng này
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onSubmit}>Xác nhận</Button>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDelete;
