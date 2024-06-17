import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import {
  getSurveyListData,
  selectSurveysData,
  setAssistant,
  setCurrentPage,
} from "@redux/slices/survey.slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import SurveyPrompt from "@main/components/prompts/SurveyPrompt";
import { SemesterMap } from "@main/types/term.type";
import { selectCurrentUser } from "@redux/slices/authentication.slice";

const SurveyList = () => {
  const dispatch = useAppDispatch();
  const surveysData = useAppSelector(selectSurveysData);
  const { currentSetting } = useAppSelector(selectCurrentUser)!;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(getSurveyListData());
  }, [dispatch, page]);

  const createOnClickHandler = (assistant: string) => {
    return () => {
      dispatch(setAssistant(assistant));
    };
  };

  return (
    <>
      <h2 className="display-5 mt-2 mb-3">
        Danh sách trợ giảng HK {SemesterMap[currentSetting!.semester]} năm học{" "}
        {currentSetting!.year}
      </h2>
      <Table responsive>
        <thead>
          <tr className="table-header">
            <th>TT</th>
            <th>Mail</th>
            <th>Họ tên</th>
            <th>MSSV</th>
            <th>SĐT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {surveysData.data.map((survey, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{survey.email}</td>
              <td>{survey.name}</td>
              <td>{survey.code}</td>
              <td>{survey.phoneNumber}</td>
              <td>
                {survey.isSubmited ? (
                  <span>Đã đánh giá</span>
                ) : (
                  <Button
                    variant="primary"
                    onClick={createOnClickHandler(survey.code)}
                  >
                    Đánh giá
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-align">
        <PaginationControl
          page={page}
          between={4}
          total={surveysData.count}
          limit={10}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={2}
        />
      </div>
      <SurveyPrompt />
    </>
  );
};

export default SurveyList;
