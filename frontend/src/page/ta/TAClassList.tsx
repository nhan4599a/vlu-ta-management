import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import TasksPrompt from "../../components/promts/TasksPrompt";

const TAClassList = () => {
  const [user, setUser] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

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
        <tr>
              <td>1</td>
              <td>abc</td>
              <td>abcc</td>
              <td>abc</td>
              <td>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Nhiệm vụ
                </Button>
                
              </td>
            </tr>
          {/* {user.map((ta, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{ta.name}</td>
              <td>{ta.code}</td>
              <td>{ta.class}</td>
              <td>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Nhiệm vụ
                </Button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </Table>
      <div className="text-align">
        <PaginationControl
          page={page}
          between={4}
          total={count}
          limit={10}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={2}
        />
      </div>
      <TasksPrompt show={showModal} onHide={() => setShowModal(false)}/>
    </div>
  );
};

export default TAClassList;
