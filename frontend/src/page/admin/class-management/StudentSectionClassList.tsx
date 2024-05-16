import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectTermsData } from "@redux/slices/terms.slice";
import {
  setActiveTermName,
  setScheduleId
} from "@redux/slices/recruiment.slice";
import { TermDataItem } from "@main/types/term.type";
import "../../index.css";

const StudentSectionClassList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const openApplyRecruimentPromt = (term: TermDataItem) => {
    return () => {
      dispatch(setScheduleId(term.scheduleId))
      dispatch(setActiveTermName(term.name))
    }
  }

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
      <Table responsive>
        <thead className="table-header">
          <tr>
            <th>TT</th>
            <th>Mã môn học</th>
            <th>Môn học</th>
            <th>Tiết</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {termsResponse.data.map((term, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{term.code}</td>
              <td>{term.name}</td>
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