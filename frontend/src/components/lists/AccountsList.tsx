import React from "react";
import { Table } from "react-bootstrap";
import "../../index.css";
import Delete from "../links/Delete";

const AccountsList = () => {
  return (
    <Table responsive className="accounts-list">
      <thead>
        <tr className="table-header">
          <th>TT</th>
          <th>Mail</th>
          <th>Họ tên</th>
          <th>MSSV</th>
          <th>Khoa</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>duy.207ct27685</td>
          <td>Nguyễn Châu Phương Duy</td>
          <td>207CT27685</td>
          <td>Khoa CNTT</td>
          <td>
            <Delete />
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>duy.207ct27685</td>
          <td>Nguyễn Châu Phương Duy</td>
          <td>207CT27685</td>
          <td>Khoa CNTT</td>
          <td>
            <Delete />
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>duy.207ct27685</td>
          <td>Nguyễn Châu Phương Duy</td>
          <td>207CT27685</td>
          <td>Khoa CNTT</td>
          <td>
            <Delete />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default AccountsList;
