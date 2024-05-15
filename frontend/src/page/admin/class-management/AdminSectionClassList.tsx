import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  selectTermsData,
} from "../../features/slices/terms.slice";
import {
  GetRecruimentPayload,
  getRecuimentInfo,
  setGetDataPayload,
} from "../../features/slices/recruiment.slice";
import "../../index.css";

const AdminSectionClassList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const fetchRecruimentInfo = (payload: GetRecruimentPayload) => {
    return () => {
      dispatch(setGetDataPayload(payload));
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
                {!term.isRegistered && !term.isApproved ? (
                  <Button
                    variant="primary"
                    className="w-100 mt-1"
                    onClick={fetchRecruimentInfo({
                      id: term.id,
                      scheduleId: term.scheduleId,
                    })}
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
