import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  selectRecruimentInfo,
  unsetRecruimentInfo,
  updateRecruimentInfo,
} from "@redux/slices/recruiment.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { getTermsDataList } from "@redux/slices/terms.slice";
import { selectTermClassInfo } from "@redux/slices/application.slice";

const RecruimentRegisterPrompt = () => {
  const dispatch = useAppDispatch();
  const term = useAppSelector(selectTermClassInfo);
  const recruimentInfo = useAppSelector(selectRecruimentInfo);

  const [candidatesCount, setCandidatesCount] = useState(0);
  const [criteria, setCriteria] = useState("");
  const [reason, setReason] = useState("");


  useEffect(() => {
    if (recruimentInfo) {
      setCandidatesCount(recruimentInfo.candidatesCount);
      setCriteria(recruimentInfo.criteria);
      setReason(recruimentInfo.reason);
    }
  }, [recruimentInfo]);

  const closeModal = () => {
    dispatch(unsetRecruimentInfo());
    setCandidatesCount(0);
    setCriteria("");
    setReason("");
  };

  const onSubmitSave = async () => {
    await dispatch(
      updateRecruimentInfo({
        candidatesCount: candidatesCount ?? 0,
        reason: reason ?? "",
        criteria: criteria ?? "",
      })
    );
    dispatch(showMessageDialog("Đăng ký tuyển dụng trợ giảng thành công"));
    closeModal();
    await dispatch(getTermsDataList());
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
          Tuyển dụng trợ giảng môn thứ tiết
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
          <Form.Group className="mb-3" controlId="taquantity">
            <Form.Label>Số lượng:</Form.Label>
            <Form.Control
              value={candidatesCount}
              type="number"
              onChange={(e) =>
                setCandidatesCount(e.target.value as unknown as number)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tadescription">
            <Form.Label>Yêu cầu:</Form.Label>
            <Form.Control
              value={criteria}
              as="textarea"
              rows={3}
              onChange={(e) => setCriteria(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Lý do:</Form.Label>
            <Form.Control
              value={reason}
              as="textarea"
              rows={3}
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Đóng
        </Button>
        <Button onClick={onSubmitSave}>Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecruimentRegisterPrompt;
