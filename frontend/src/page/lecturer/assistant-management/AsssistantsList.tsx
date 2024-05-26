import AccountsList from "@main/components/lists/AccountsList";
import TasksPrompt from "@main/components/prompts/TasksPrompt";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  getTermClassInfo,
  selectTermClassInfo,
} from "@main/features/slices/application.slice";
import { setScheduleId } from "@main/features/slices/recruiment.slice";
import {
  openTasksPrompt,
  setScheduleId as setTasksScheduleId,
} from "@main/features/slices/tasks.slice";
import { setAssignee, getTasks } from "@main/features/slices/tasks.slice";
import {
  getAssistantsList,
  selectUsersList,
} from "@main/features/slices/users.slice";
import { IUser } from "@main/types/user.type";
import { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useParams } from "react-router-dom";

export const AssistantsList = () => {
  const dispatch = useAppDispatch();
  const usersResponse = useAppSelector(selectUsersList);
  const termClass = useAppSelector(selectTermClassInfo);

  const { scheduleId } = useParams();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setScheduleId(scheduleId));
    dispatch(setTasksScheduleId(scheduleId));
    dispatch(getAssistantsList(page));
    dispatch(getTermClassInfo(scheduleId!));
  }, [dispatch, scheduleId, page]);

  const onActionButtonClick = async (user: IUser) => {
    dispatch(setAssignee(user._id));
    await dispatch(getTasks());
    dispatch(openTasksPrompt(true));
  };

  return (
    <>
      <h2 className="display-5 mt-2 mb-3">
        Danh sách trợ giảng lớp {termClass?.name} - {termClass?.day}{" "}
        {termClass?.lesson}
      </h2>
      <AccountsList
        actionEnabled={true}
        actionButtonText="Giao nhiệm vụ"
        onActionButtonClick={onActionButtonClick}
      />
      <div className="text-align">
        <PaginationControl
          page={page}
          between={4}
          total={usersResponse.count}
          limit={10}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={2}
        />
      </div>
      <TasksPrompt />
    </>
  );
};
