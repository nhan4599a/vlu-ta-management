import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectTermsData } from "@redux/slices/terms.slice";
import {
  getRecuimentInfo,
  setScheduleId,
} from "@redux/slices/recruiment.slice";
import { getTermClassInfo } from "@main/features/slices/application.slice";
import "@main/index.css";

const AdminSectionClassList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const fetchRecruimentInfo = (payload: string) => {
    return async () => {
      await dispatch(getTermClassInfo(payload))
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
                {term.isApproved
                  ? "Đã xong"
                  : term.isRegistered
                  ? "Chờ xác nhận"
                  : ""}
              </td>
              <td>
                {term.isRegistered && !term.isApproved ? (
                  <Button
                    variant="primary"
                    className="w-100 mt-1"
                    onClick={fetchRecruimentInfo(term.scheduleId)}
                  >
                    Chấp nhận yêu cầu tuyển TA
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

export default AdminSectionClassList;
