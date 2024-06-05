import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getTermsDataList,
  selectTermsData,
  setCurrentPage,
} from "@redux/slices/terms.slice";
import {
  getRecuimentInfo,
  setScheduleId,
} from "@redux/slices/recruiment.slice";
import { TermDataItem } from "@main/types/term.type";
import {
  getApplicationInfo,
  getTermClassInfo,
  setApplicationId,
} from "@redux/slices/application.slice";
import {
  setScheduleId as setTasksScheduleId,
  setAssignee,
  openTasksPrompt,
  getTasks,
} from "@redux/slices/tasks.slice";
import { selectCurrentUser } from "@redux/slices/authentication.slice";
import TARegisterPrompt from "@main/components/prompts/TARegisterPrompt";
import TasksPrompt from "@main/components/prompts/TasksPrompt";
import { MinimalApplicationForm } from "@main/types/application-form.type";
import "@main/index.css";

const getApplicationStatus = (application: MinimalApplicationForm) => {
  if (!application) {
    return "";
  }

  if (application.stage1Approval === null) {
    return "Đang chờ xác nhận";
  }

  if (!application.stage1Approval) {
    return "Đã rớt sơ tuyển";
  }

  if (application.stage2Approval === null) {
    return "Đã đậu sơ tuyển";
  }

  if (!application.stage2Approval && !application.isTrainingPassed) {
    return "Rớt training";
  }

  return "Đã đậu TA";
};

const StudentApplicationsList = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const termsResponse = useAppSelector(selectTermsData);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(getTermsDataList());
  }, [dispatch, page]);

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
    <>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
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
                  {getApplicationStatus(applicationInfo)}
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
      <div className="text-align">
        <PaginationControl
          page={page}
          between={4}
          total={termsResponse.count}
          limit={10}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={2}
        />
      </div>
      <TARegisterPrompt />
      <TasksPrompt />
    </>
  );
};

export default StudentApplicationsList;
