import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  approveRecruimentInfo,
  selectIsAdminMode,
  selectRecruimentInfo,
  unsetRecruimentInfo,
  updateRecruimentInfo,
} from "../../features/slices/recruiment.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { showMessageDialog } from "../../features/slices/messages.slice";

type RecruimentPromtProps = {
  afterSubmitCallback: () => void
}

const RecruimentPromt = ({ afterSubmitCallback }: RecruimentPromtProps) => {
  const dispatch = useAppDispatch();
  const recruimentInfo = useAppSelector(selectRecruimentInfo);
  const isAdminMode = useAppSelector(selectIsAdminMode)

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

  const onSubmitSave = () => {
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
        afterSubmitCallback()
      });
  };

  const onSubmitApprove = (approved: boolean) => {
    return () => {
      dispatch(
        approveRecruimentInfo(approved)
      )
        .then(unwrapResult)
        .then(() => {
          dispatch(showMessageDialog("Duyệt tin tuyển dụng trợ giảng thành công"));
          closeModal()
          afterSubmitCallback()
        });
    }
  }

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
          <Form.Group className="mb-3" controlId="taquantity">
            <Form.Label>Số lượng:</Form.Label>
            <Form.Control
              disabled={isAdminMode}
              value={candidatesCount}
              type="number"
              onChange={(e) => setCandidatesCount(e.target.value as unknown as number)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tadescription">
            <Form.Label>Yêu cầu:</Form.Label>
            <Form.Control
              disabled={isAdminMode}
              value={criteria}
              as="textarea"
              rows={3}
              onChange={e => setCriteria(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskdescription">
            <Form.Label>Lý do:</Form.Label>
            <Form.Control
              disabled={isAdminMode}
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
        {
          isAdminMode ? (
            <>
              <Button onClick={onSubmitApprove(false)}>Từ chối</Button>
              <Button onClick={onSubmitApprove(true)}>Chấp nhận</Button>
            </>
          ) : (
            <Button onClick={onSubmitSave}>
              Lưu
            </Button>
          )
        }
      </Modal.Footer>
    </Modal>
  );
};

export default RecruimentPromt;
