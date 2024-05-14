import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import TasksPrompt from "../../components/promts/TasksPrompt";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { getTasks, setAssignee } from "../../features/slices/tasks.slice";
import {
  getUsersList,
  selectUsersList,
  setRequest,
} from "../../features/slices/users.slice";
import { Role } from "../../types/user.type";

const TAClassList = () => {
  const dispatch = useAppDispatch();

  const usersResponse = useAppSelector(selectUsersList);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const request = {
      role: Role.Student,
      isAssistant: true,
      page,
    };
    dispatch(setRequest(request));
    dispatch(getUsersList(request));
  }, [dispatch, page]);

  const openTaskModal = (userId: string) => {
    return () => {
      dispatch(setAssignee(userId));
      dispatch(getTasks())
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
            <th>Tên</th>
            <th>MSSV</th>
            <th>Lớp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usersResponse.data.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.code}</td>
              <td>{user.class}</td>
              <td>
                <Button variant="primary" onClick={openTaskModal(user._id)}>
                  Nhiệm vụ
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    </div>
  );
};

export default TAClassList;
