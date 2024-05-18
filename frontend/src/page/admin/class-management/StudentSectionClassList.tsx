import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectTermsData } from "@redux/slices/terms.slice";
import {
  setActiveTermName,
  setScheduleId,
} from "@redux/slices/recruiment.slice";
import { TermDataItem } from "@main/types/term.type";
import { selectCurrentUser } from "@main/features/slices/authentication.slice";
import "@main/index.css";
import {
  getApplicationInfo,
  setApplicationId,
} from "@main/features/slices/application.slice";

const StudentSectionClassList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const termsResponse = useAppSelector(selectTermsData);

  const openApplyRecruimentPromt = (
    term: TermDataItem,
    applicationId?: string
  ) => {
    return async () => {
      if (applicationId) {
        dispatch(setApplicationId(applicationId));
        await dispatch(getApplicationInfo());
      }
      dispatch(setScheduleId(term.scheduleId));
      dispatch(setActiveTermName(term.name));
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
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {termsResponse.data.map((term, index) => {
            const applicationInfo = term.applications!.find(
              (e) => e._id === user?._id
            );

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{term.code}</td>
                <td>{term.name}</td>
                <td>{term.day}</td>
                <td>{term.lesson}</td>
                <td>
                  {applicationInfo
                    ? applicationInfo.stage1Approval
                      ? "Đã xác nhận"
                      : "Đang chờ xác nhận"
                    : ""}
                </td>
                <td>
                  {applicationInfo ? (
                    applicationInfo.stage1Approval ? null : (
                      <Button
                        variant="info"
                        className="w-100 mt-1"
                        onClick={openApplyRecruimentPromt(
                          term,
                          applicationInfo._id
                        )}
                      >
                        Cập nhật
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="primary"
                      className="w-100 mt-1"
                      onClick={openApplyRecruimentPromt(term)}
                    >
                      Ứng tuyển
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentSectionClassList;
