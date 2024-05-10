import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  selectRecruimentInfo,
  unsetRecruimentInfo,
  updateRecruimentInfo,
} from "../../features/slices/recruiment.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { showMessageDialog } from "../../features/slices/messages.slice";

const RecruimentPromt = () => {
  const recruimentInfo = useAppSelector(selectRecruimentInfo);
  const dispatch = useAppDispatch();

  const [candidatesCount, setCandidatesCount] = useState<number>();
  const [criteria, setCriteria] = useState<string>();
  const [reason, setReason] = useState<string>();

  useEffect(() => {
    if (recruimentInfo) {
      setCandidatesCount(recruimentInfo.candidatesCount)
      setCriteria(recruimentInfo.criteria)
      setReason(recruimentInfo.reason)
    }
  }, [recruimentInfo])

  const closeModal = () => {
    dispatch(unsetRecruimentInfo());
    setCandidatesCount(undefined)
    setCriteria(undefined)
    setReason(undefined)
  };

  const onSubmit = () => {
    dispatch(
      updateRecruimentInfo({
        candidatesCount: candidatesCount ?? 0,
        reason: reason ?? "",
        criteria: criteria ?? "",
      })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(showMessageDialog("Đăng ký tuyển dụng trợ giảng thành công"));
        closeModal()
      });
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
              value={candidatesCount}
              type="number"
              onChange={(e) => setCandidatesCount(e.target.value as unknown as number)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Yêu cầu:</Form.Label>
            <Form.Control
              value={criteria}
              as="textarea"
              rows={3}
              onChange={e => setCriteria(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Lý do:</Form.Label>
            <Form.Control
              value={reason}
              as="textarea"
              rows={3}
              onChange={e => setReason(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Đóng
        </Button>
        <Button onClick={onSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecruimentPromt;
