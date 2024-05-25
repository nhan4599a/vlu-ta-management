import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  approveRecruimentInfo,
  selectRecruimentInfo,
  unsetRecruimentInfo,
} from "@redux/slices/recruiment.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { getTermsDataList } from "@redux/slices/terms.slice";
import { selectTermClassInfo } from "@main/features/slices/application.slice";

const ApproveRecruimentPrompt = () => {
  const dispatch = useAppDispatch();
  const term = useAppSelector(selectTermClassInfo);
  const recruimentInfo = useAppSelector(selectRecruimentInfo);

  const closeModal = () => {
    dispatch(unsetRecruimentInfo());
  };

  const onSubmitApprove = (approved: boolean) => {
    return async () => {
      await dispatch(approveRecruimentInfo(approved));
      dispatch(showMessageDialog("Duyệt tin tuyển dụng trợ giảng thành công"));
      await dispatch(getTermsDataList());
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
          <Form.Group className="mb-3" controlId="termname">
            <Form.Label>Môn:</Form.Label>
            <Form.Control disabled defaultValue={term?.name} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="termday">
            <Form.Label>Thứ:</Form.Label>
            <Form.Control disabled defaultValue={term?.day} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="termlesson">
            <Form.Label>Tiết:</Form.Label>
            <Form.Control disabled value={term?.lesson} type="text" />
          </Form.Group>
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
        <Button variant="light" onClick={closeModal}>
          Đóng
        </Button>
        <Button variant="secondary" onClick={onSubmitApprove(false)}>Từ chối</Button>
        <Button variant="primary" onClick={onSubmitApprove(true)}>Chấp thuận</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApproveRecruimentPrompt;
