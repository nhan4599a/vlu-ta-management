import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectTermsData } from "@redux/slices/terms.slice";
import {
  getRecuimentInfo,
  setScheduleId,
} from "@redux/slices/recruiment.slice";
import { getTermClassInfo } from "@redux/slices/application.slice";
import { TermDataItem } from "@main/types/term.type";
import "@main/index.css";

const getTermStatus = (term: TermDataItem) => {
  if (term.isApproved) {
    return "Đã hoàn thành"
  }

  if (term.isRegistered && term.isWaiting) {
    return "Đang chờ"
  }

  if (term.isRegistered && !term.isApproved) {
    return "Đã từ chối"
  }
  
  return ""
}

const TeacherSectionClassList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const fetchRecruimentInfo = (payload: string) => {
    return () => {
      dispatch(getTermClassInfo(payload));
      dispatch(setScheduleId(payload));
      dispatch(getRecuimentInfo());
    };
  };

  return (
    <div>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {termsResponse.data.map((term, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{term.code}</td>
              <td>{term.name}</td>
              <td>{term.credits}</td>
              <td>{term.type}</td>
              <td>{term.day}</td>
              <td>{term.lesson}</td>
              <td>
                {getTermStatus(term)}
              </td>
              <td>
                {!term.isApproved ? (
                  <Button
                    variant={term.isRegistered ? "info" : "primary"}
                    className="w-100"
                    onClick={fetchRecruimentInfo(term.scheduleId)}
                  >
                    {term.isRegistered ? "Cập nhật" : "Yêu cầu trợ giảng"}
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
