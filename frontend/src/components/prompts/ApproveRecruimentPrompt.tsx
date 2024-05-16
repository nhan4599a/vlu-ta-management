import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  approveRecruimentInfo,
  selectRecruimentInfo,
  unsetRecruimentInfo,
} from "@redux/slices/recruiment.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { getTermsDataList } from "@redux/slices/terms.slice";

const ApproveRecruimentPrompt = () => {
  const dispatch = useAppDispatch();
  const recruimentInfo = useAppSelector(selectRecruimentInfo);

  const closeModal = () => {
    dispatch(unsetRecruimentInfo());
  };

  const onSubmitApprove = (approved: boolean) => {
    return async () => {
      await dispatch(approveRecruimentInfo(approved))
      dispatch(showMessageDialog("Duyệt tin tuyển dụng trợ giảng thành công"))
      await dispatch(getTermsDataList())
      closeModal();
    };
  };

  return (
    <Modal
      show={recruimentInfo !== undefined}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tuyển dụng trợ giảng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Số lượng:</Form.Label>
            <Form.Control
              disabled
              defaultValue={recruimentInfo?.candidatesCount}
              type="number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Yêu cầu:</Form.Label>
            <Form.Control
              disabled
              defaultValue={recruimentInfo?.criteria}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Lý do:</Form.Label>
            <Form.Control
              disabled
              defaultValue={recruimentInfo?.reason}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Đóng
        </Button>
        <Button onClick={onSubmitApprove(true)}>Approve</Button>
        <Button onClick={onSubmitApprove(true)}>Reject</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApproveRecruimentPrompt;
