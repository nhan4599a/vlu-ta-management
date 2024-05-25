import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectTermsData } from "@redux/slices/terms.slice";
import {
  getRecuimentInfo,
  setScheduleId,
} from "@redux/slices/recruiment.slice";
import { TermDataItem } from "@main/types/term.type";
import {
  getApplicationInfo,
  getTermClassInfo,
  setApplicationId,
} from "@main/features/slices/application.slice";
import {
  setScheduleId as setTasksScheduleId,
  setAssignee,
  openTasksPrompt,
  getTasks,
} from "@main/features/slices/tasks.slice";
import { selectCurrentUser } from "@main/features/slices/authentication.slice";
import "@main/index.css";

const StudentSectionClassList = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
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

      await Promise.all([
        dispatch(getRecuimentInfo()),
        dispatch(getTermClassInfo(term.scheduleId)),
      ]);
    };
  };

  const onOpenTasksPromptClick = (scheduleId: string) => {
    return async () => {
      dispatch(setTasksScheduleId(scheduleId));
      dispatch(setAssignee(currentUser!.code));
      await dispatch(getTasks());
      dispatch(openTasksPrompt(true));
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
            const applicationInfo = term.applications![0];

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
                    applicationInfo.stage1Approval ? (
                      applicationInfo.stage2Approval ? (
                        <Button
                          onClick={onOpenTasksPromptClick(term.scheduleId)}
                        >
                          Nhiệm vụ
                        </Button>
                      ) : null
                    ) : (
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
