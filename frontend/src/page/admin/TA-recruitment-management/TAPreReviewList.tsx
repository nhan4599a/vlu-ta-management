import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

const TAPreReviewList = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [approved, setApproved] = useState(false);
  
  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
      <Table responsive>
        <thead className="table-header">
          <tr>
            <th>TT</th>
            <th>Họ và tên</th>
            <th>MSSV</th>
            <th>Email</th>
            <th>Lớp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>abc</td>
            <td>187pm14004</td>
            <td>abc@gmail.com</td>
            <td>PM2</td>
            <td>
              <Button variant="primary"></Button>
            </td>
          </tr>
          {/* {user.data.map((usereligible, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{usereligible.code}</td>
              <td>{usereligible.name}</td>
              <td>{usereligible.lesson}</td>
              <td>
                <Button variant="primary">Đăng ký</Button>
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
    </div>
  );
};

export default TAPreReviewList;
