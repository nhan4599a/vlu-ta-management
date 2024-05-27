import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  attachAttendanceRecordFile,
  getTermsDataList,
  selectActiveSchedule,
  setCurrentSchedule,
} from "@redux/slices/terms.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";

const AttendanceLinkPrompt = () => {
  const dispatch = useAppDispatch();
  const currentSchedule = useAppSelector(selectActiveSchedule);

  const [attendantUrl, setAttendantUrl] = useState<string | null>(
    currentSchedule?.attendanceRecordFile ?? null
  );

  const closeModal = () => {
    dispatch(setCurrentSchedule(undefined));
    setAttendantUrl(null)
  };

  const saveAttendantUrl = async () => {
    await dispatch(attachAttendanceRecordFile(attendantUrl));
    dispatch(
      showMessageDialog({
        message: "Cập nhật link điểm danh thành công",
        onPrimaryButtonClick: async () => {
          await dispatch(getTermsDataList());
          closeModal();
        },
      })
    );
  };

  return (
    <Modal
      show={currentSchedule !== undefined}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="attendancelink">
            <Form.Label>Dán link điểm danh:</Form.Label>
            <Form.Control
              value={attendantUrl ?? ""}
              onChange={(e) => setAttendantUrl(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={closeModal}>
          Đóng
        </Button>
        <Button variant="primary" onClick={saveAttendantUrl}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceLinkPrompt;
