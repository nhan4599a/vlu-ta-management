import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DropzoneComponent from "../dropzone/Dropzone";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  approveApplicationForm,
  selectApplicationId,
  selectApplicationInfo,
  selectTermClassInfo,
  setApplicationId,
} from "@redux/slices/application.slice";
import { AsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import "@main/index.css";

type Props<TResponse> = {
  dataFetcherThunk: AsyncThunk<TResponse, undefined, AsyncThunkConfig>
}

const TARegisterApprovalPrompt = <TResponse,>({ dataFetcherThunk }: Props<TResponse>) => {
  const dispatch = useAppDispatch();
  const applicationId = useAppSelector(selectApplicationId)
  const applicationInfo = useAppSelector(selectApplicationInfo);
  const termClassInfo = useAppSelector(selectTermClassInfo)

  const onHide = () => {
    dispatch(setApplicationId(undefined));
  };

  const onSubmit = (approve: boolean) => {
    return async () => {
      await dispatch(approveApplicationForm(approve))
      await dispatch(dataFetcherThunk())
      onHide();
    }
  };

  return (
    <Modal
      show={applicationId !== undefined}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ứng tuyển làm trợ giảng môn {termClassInfo?.name} tiết {termClassInfo?.lesson}
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
              defaultValue={applicationInfo?.description}
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
              <Form.Control
                disabled
                defaultValue={applicationInfo?.name}
                type="text"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="Email">
            <Form.Label column sm="2">
              Email VLU
            </Form.Label>
            <Col sm="10">
              <Form.Control disabled defaultValue={applicationInfo?.name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="studentclass">
            <Form.Label column sm="2">
              Lớp
            </Form.Label>
            <Col sm="10">
              <Form.Control disabled defaultValue={applicationInfo?.class} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="mobilephone">
            <Form.Label column sm="2">
              Số điện thoại
            </Form.Label>
            <Col sm="10">
              <Form.Control
                disabled
                defaultValue={applicationInfo?.phoneNumber}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="grade1">
            <Form.Label column sm="2">
              Điểm môn 1:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                disabled
                defaultValue={applicationInfo?.termScore}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="grade2">
            <Form.Label column sm="2">
              Điểm môn 2:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                disabled
                defaultValue={applicationInfo?.avgScore}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="attachment">
            <Form.Label column sm="2">
              File đính kèm
            </Form.Label>
            <Col sm="10">
              <DropzoneComponent
                files={applicationInfo?.attachments}
                allowDownload={true}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button onClick={onSubmit(true)}>Reject</Button>
        <Button onClick={onSubmit(false)}>Approve</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TARegisterApprovalPrompt;
