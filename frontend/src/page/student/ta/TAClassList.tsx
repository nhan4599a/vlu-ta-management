import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import TasksPrompt from "@main/components/prompts/TasksPrompt";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setScheduleId, getTasks, openTasksPrompt, setAssignee } from "@redux/slices/tasks.slice";
import { selectCurrentUser } from "@redux/slices/authentication.slice";
import { getTermsDataList, selectTermsData, setCurrentPage } from "@redux/slices/terms.slice";

const TAClassList = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const termsResponse = useAppSelector(selectTermsData);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(page))
    dispatch(getTermsDataList())
  }, [dispatch, page]);

  const onOpenTasksPromptClick = (scheduleId: string) => {
    return async () => {
      dispatch(setScheduleId(scheduleId));
      dispatch(setAssignee(currentUser!.code));
      await dispatch(getTasks());
      dispatch(openTasksPrompt(true));
    };
  };

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">
        Danh sách lớp trợ giảng của sinh viên
      </h2>
      <Table responsive>
        <thead>
          <tr className="table-header">
            <th>TT</th>
            <th>Mã môn học</th>
            <th>Môn học</th>
            <th>Thứ</th>
            <th>Tiết</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {termsResponse.data.map((term, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{term.code}</td>
                <td>{term.name}</td>
                <td>{term.day}</td>
                <td>{term.lesson}</td>
                <td>
                  <Button onClick={onOpenTasksPromptClick(term.scheduleId)}>Nhiệm vụ</Button>
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
      <TasksPrompt />
    </div>
  );
};

export default TAClassList;
