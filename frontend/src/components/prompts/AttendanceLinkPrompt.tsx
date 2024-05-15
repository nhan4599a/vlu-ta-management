import React, { useState } from "react";
import { Button, Form, Modal, ModalProps } from "react-bootstrap";
import LinkItem from "../LinkItem";

type AttendanceLinkPromptProps = ModalProps & {
  url: string;
};

const AttendanceLinkPrompt = (props: AttendanceLinkPromptProps) => {
  const [attendance, setAttendance] = useState<string>();
  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="attendancelink">
            <Form.Label>Dán link điểm danh:</Form.Label>
            <Form.Control
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          <LinkItem to={props.url}>Xem link điểm danh</LinkItem>
        </Button>
        <Button variant="primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceLinkPrompt;
