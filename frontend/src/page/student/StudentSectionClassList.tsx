import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectTermsData } from "@redux/slices/terms.slice";
import {
  getRecuimentInfo,
  setScheduleId,
} from "@redux/slices/recruiment.slice";
import { TermDataItem } from "@main/types/term.type";
import { getTermClassInfo } from "@main/features/slices/application.slice";
import "@main/index.css";

const StudentSectionClassList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const openApplyRecruimentPromt = (term: TermDataItem) => {
    return async () => {
      dispatch(setScheduleId(term.scheduleId));

      await Promise.all([
        dispatch(getRecuimentInfo()),
        dispatch(getTermClassInfo(term.scheduleId)),
      ]);
    };
  };

  return (
    <div>
      <Table responsive>
        <thead className="table-header">
          <tr>
            <th>TT</th>
            <th>Mã môn học</th>
            <th>Môn học</th>
            <th>Thứ</th>
            <th>Tiết</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {termsResponse.data.map((term, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{term.code}</td>
              <td>{term.name}</td>
              <td>{term.day}</td>
              <td>{term.lesson}</td>
              <td>
                <Button
                  variant="primary"
                  className="w-100 mt-1"
                  onClick={openApplyRecruimentPromt(term)}
                >
                  Ứng tuyển
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentSectionClassList;
