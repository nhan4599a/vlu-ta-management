import TasksPrompt from "@main/components/prompts/TasksPrompt";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import { getTasks, setAssignee } from "@main/features/slices/tasks.slice";
import { selectTermsData } from "@main/features/slices/terms.slice";
import { getUsersList, selectUsersList, setRequest } from "@main/features/slices/users.slice";
import { Role } from "@main/types/user.type";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

const ClassLisstWithAssistant = () => {
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

  const termsResponse = useAppSelector(selectTermsData);
  const openTaskModal = (userCode: string) => {
    return () => {
      dispatch(setAssignee(userCode));
      dispatch(getTasks())
    };
  };

  return (
    <>
      <h2 className="display-5 mt-2 mb-3">
        Quản lý danh sách lớp với trợ giảng
      </h2>
      <Table responsive>
        <thead className="table-header">
          <tr>
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
                  <Button variant="primary" onClick={openTaskModal(term.code!)}>
                    Xem Nhiệm vụ
                  </Button>
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

export default ClassLisstWithAssistant;
