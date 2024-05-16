import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectTermsData } from "@redux/slices/terms.slice";
import {
  getRecuimentInfo,
  setScheduleId
} from "@redux/slices/recruiment.slice";
import "../../index.css";

const TeacherSectionClassList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const fetchRecruimentInfo = (payload: string) => {
    return () => {
      dispatch(setScheduleId(payload));
      dispatch(getRecuimentInfo());
    };
  };

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
      <Table responsive>
        <thead>
          <tr className="table-header ">
            <th>TT</th>
            <th>Mã LHP</th>
            <th>Tên HP</th>
            <th>Số TC</th>
            <th>Loại HP</th>
            <th>Thứ</th>
            <th>Tiết học</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {termsResponse.data.map((term, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{term.code}</td>
              <td>{term.name}</td>
              <td>{term.credits}</td>
              <td>{term.type}</td>
              <td>{term.day}</td>
              <td>{term.lesson}</td>
              <td>
                {!term.isApproved ? (
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={fetchRecruimentInfo(term.scheduleId)}
                  >
                    Yêu cầu trợ giảng
                  </Button>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeacherSectionClassList;
