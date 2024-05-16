import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { closeMessageDialog, selectCurrentMessage } from "@redux/slices/messages.slice";

const MessagePromt = () => {
  const dispatch = useAppDispatch()
  const messageOption = useAppSelector(selectCurrentMessage)

  const handleClose = () => {
    dispatch(closeMessageDialog())
    messageOption?.onButtonClick?.()
  }

  return (
    <Modal
      show={messageOption !== undefined}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        {messageOption?.message ?? ''}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessagePromt;
