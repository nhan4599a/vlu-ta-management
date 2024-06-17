import { ChangeEvent, useCallback, useState } from "react";
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
  Table,
} from "react-bootstrap";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { showMessageDialog } from "@redux/slices/messages.slice";
import {
  getSurveyListData,
  selectSelectedAssistant,
  setAssistant,
  submitAssistantSurvey,
} from "@redux/slices/survey.slice";
import { surveyData } from "@main/store/survey-data";
import '@main/index.css'

const initialState: (number | undefined)[][] = surveyData.map(({ content }) => {
  return Array(content.length).fill(undefined);
});
type InitialState = typeof initialState;

const SurveyPrompt = () => {
  const dispatch = useAppDispatch();
  const assistant = useAppSelector(selectSelectedAssistant);

  const [surveyResult, setSurveyResult] = useState<InitialState>(initialState);

  const createOnChangeHandler = useCallback(
    (parentIndex: number, childIndex: number) => {
      return (e: ChangeEvent<HTMLInputElement>) => {
        const currentSurveyResult = [...surveyResult];
        currentSurveyResult[parentIndex][childIndex] = Number(e.target.value);
        setSurveyResult(currentSurveyResult);
      };
    },
    [surveyResult]
  );

  const closeModal = () => {
    dispatch(setAssistant(undefined));
  };

  const validateDataBeforeSubmit = () => {
    const result: number[] = Array(surveyResult.length).fill(0);

    for (let i = 0; i < result.length; i++) {
      const surveySubData = surveyResult[i];

      for (const score of surveySubData) {
        if (!score) {
          return undefined;
        }

        result[i] += score;
      }

      result[i] /= surveySubData.length;
    }

    return result;
  };

  const submit = () => {
    const surveyData = validateDataBeforeSubmit();

    if (!surveyData) {
      dispatch(showMessageDialog("Chưa điền hết các options"));
      return;
    }

    dispatch(submitAssistantSurvey(surveyData))
      .then(unwrapResult)
      .then(() => {
        dispatch(getSurveyListData());
        closeModal();
      });
  };

  return (
    <Modal
      show={assistant !== undefined}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="survey-prompt"
      centered
    >
      <ModalHeader closeButton>
        <ModalTitle>Đánh giá trợ giảng</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <h4>
          Chọn câu trả lời mức độ đồng ý từ 1 đến 5 theo ý kiến cá nhân về hoạt
          động trợ giảng
        </h4>
        <Row className="my-4 text-success">
          <Col>
            <h6>1. Hoàn toàn không đồng ý</h6>
          </Col>
          <Col>
            <h6>2. Không đồng ý</h6>
          </Col>
          <Col>
            <h6>3. Tương đối đồng ý</h6>
          </Col>
          <Col>
            <h6>4. Đồng ý</h6>
          </Col>
          <Col>
            <h6>5. Hoàn toàn đồng ý</h6>
          </Col>
        </Row>
        <div>
          <Table responsive>
            <thead>
              <tr className="table-header text-center">
                <th>TT</th>
                <th>Nội dung</th>
                <th style={{ width: "25%" }}>Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {surveyData.map(({ title, content }, index) => (
                <>
                  <td colSpan={4}>
                    <p className="fw-bold mb-0">
                      {index + 1}. {title}
                    </p>
                  </td>
                  {content.map((question, subIndex) => (
                    <tr key={subIndex}>
                      <td>
                        {index + 1}.{subIndex + 1}
                      </td>
                      <td>{question}?</td>
                      <td>
                        <Form>
                          <div
                            className="mb-3"
                            onChange={createOnChangeHandler(index, subIndex)}
                          >
                            <Form.Check
                              type="radio"
                              inline
                              label="1"
                              value="1"
                              name={`q${index + 1}.${subIndex + 1}`}
                            />
                            <Form.Check
                              type="radio"
                              inline
                              label="2"
                              value="2"
                              name={`q${index + 1}.${subIndex + 1}`}
                            />
                            <Form.Check
                              type="radio"
                              inline
                              label="3"
                              value="3"
                              name={`q${index + 1}.${subIndex + 1}`}
                            />
                            <Form.Check
                              type="radio"
                              inline
                              label="4"
                              value="4"
                              name={`q${index + 1}.${subIndex + 1}`}
                            />
                            <Form.Check
                              type="radio"
                              inline
                              label="5"
                              value="5"
                              name={`q${index + 1}.${subIndex + 1}`}
                            />
                          </div>
                        </Form>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end gap-3">
            <Button variant="light" onClick={closeModal}>
              Đóng
            </Button>
            <Button variant="primary" onClick={submit}>
              Lưu
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SurveyPrompt;
