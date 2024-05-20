import React from "react";
import { Button, Modal, Image } from "react-bootstrap";
import DropzoneComponent from "../dropzone/Dropzone";

function DropzoneAttachmentModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          File đính kèm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DropzoneComponent allowEdit={true} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const AttachmentButton = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button variant="link" onClick={() => setModalShow(true)}>
        <Image src="/images/attach-file.png" height={20}></Image>
      </Button>

      <DropzoneAttachmentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AttachmentButton;
