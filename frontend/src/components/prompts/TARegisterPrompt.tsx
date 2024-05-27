import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DropzoneComponent, {
  DropzoneComponentMethodsRef,
} from "../dropzone/Dropzone";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectCurrentUser } from "@redux/slices/authentication.slice";
import {
  applyRecruiment,
  selectRecruimentInfo,
  selectScheduleId,
  setScheduleId
} from "@redux/slices/recruiment.slice";
import { selectApplicationInfo, selectTermClassInfo } from "@main/features/slices/application.slice";
import { getTermsDataList } from "@main/features/slices/terms.slice";
import "@main/index.css";

const TARegisterPrompt = () => {
  const dispatch = useAppDispatch();
  const scheduleId = useAppSelector(selectScheduleId);
  const termInfo = useAppSelector(selectTermClassInfo)
  const recruimentInfo = useAppSelector(selectRecruimentInfo)
  const applicationInfo = useAppSelector(selectApplicationInfo);
  const user = useAppSelector(selectCurrentUser);

  const [mobile, setMobile] = useState(user?.phoneNumber ?? "");
  const [termScore, setTermScore] = useState<number>(0);
  const [avgScore, setAvgScore] = useState<number>(0);
  const [description, setDescription] = useState("")

  const dropzoneRef = useRef<DropzoneComponentMethodsRef>(null);

  const onHide = async () => {
    dispatch(setScheduleId(undefined))
    setMobile("");
    setTermScore(0);
    setAvgScore(0);
    await dispatch(getTermsDataList())
  };

  useEffect(() => {
    if (applicationInfo) {
      setMobile(applicationInfo.phoneNumber);
      setTermScore(applicationInfo.termScore);
      setAvgScore(applicationInfo.avgScore);
      setDescription(applicationInfo.description)
    }
  }, [applicationInfo]);

  const onSubmit = async () => {
    if (!dropzoneRef.current) {
      return;
    }

    const formData = new FormData();

    const files = dropzoneRef.current.getFiles();
    for (const file of files) {
      formData.append("files", file);
    }
    formData.append("phoneNumber", mobile);
    formData.append("description", description);
    formData.append("termScore", termScore.toString());
    formData.append("avgScore", avgScore.toString());

    await dispatch(applyRecruiment(formData));
    onHide();
  };

  return (
    <Modal
      show={scheduleId !== undefined}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ứng tuyển làm trợ giảng môn {termInfo?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter">
          Yêu cầu tuyển dụng
        </Modal.Title>
        <Form>
          <Form.Group className="my-3" controlId="recruitdescription">
            <Form.Control
              disabled
              defaultValue={recruimentInfo?.criteria}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Form>
        <Modal.Title id="contained-modal-title-vcenter">
          Đơn ứng tuyển
        </Modal.Title>
        <Form>
          <Form.Group as={Row} className="my-3" controlId="fullName">
            <Form.Label column sm="2">
              Họ và tên
            </Form.Label>
            <Col sm="10">
              <Form.Control disabled defaultValue={user?.name} type="text" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="Email">
            <Form.Label column sm="2">
              Email VLU
            </Form.Label>
            <Col sm="10">
              <Form.Control disabled defaultValue={user?.email} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="studentclass">
            <Form.Label column sm="2">
              Lớp
            </Form.Label>
            <Col sm="10">
              <Form.Control disabled defaultValue={user?.class} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="mobilephone">
            <Form.Label column sm="2">
              Số điện thoại
            </Form.Label>
            <Col sm="10">
              <Form.Control
                disabled={user?.phoneNumber !== undefined}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="grade1">
            <Form.Label column sm="2">
              Điểm môn {termInfo?.name}:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                value={termScore}
                onChange={(e) => setTermScore(Number(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="grade2">
            <Form.Label column sm="2">
              Điểm trung bình học kỳ:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                value={avgScore}
                onChange={(e) => setAvgScore(Number(e.target.value))}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="recruitdescription">
            <Form.Label column sm="2">Mô tả</Form.Label>
            <Form.Control
              value={description}
              as="textarea"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="attachment">
            <Form.Label column sm="2">
              File đính kèm
            </Form.Label>
            <Col sm="10">
              <DropzoneComponent
                ref={dropzoneRef}
                files={applicationInfo?.attachments ?? []}
                allowEdit={true}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {applicationInfo ? "Lưu lại" : "Gửi đơn"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TARegisterPrompt;
