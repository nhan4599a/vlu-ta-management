import React, { useState } from "react";
import { Table } from "react-bootstrap";
// import { TermDataItem } from "../../../types/terrms.type";
import { PaginationControl } from "react-bootstrap-pagination-control";
// import TARegisterClassList from "./TARegisterClassList";
import LinkItem from "../../../components/LinkItem";

const TARecruitmentMainPage = () => {
  const [page, setPage] = useState(1);
  //   const [count, setCount] = useState(0);
  //   const [terms, setTerms] = useState<TermDataItem[]>([]);

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
      <Table responsive>
        <thead className="table-header">
          <tr>
            <th>TT</th>
            <th>Mã môn học</th>
            <th>Môn học</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>abc</td>
            <td>abc</td>
            <td>
              <p>
                <a className="link-opacity-100" href="">
                  Xem
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>abc</td>
            <td>abc</td>
            <td>
              <p>
                <a className="link-opacity-100" href="">
                  Xem
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>abc</td>
            <td>abc</td>
            <td>
              <p>
                <a className="link-opacity-100">
                  <LinkItem to={""} >Xem</LinkItem>
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>abc</td>
            <td>abc</td>
            <td>
              <p>
                <a className="link-opacity-100" href="">
                  Xem
                </a>
              </p>
            </td>
          </tr>
          {/* {terms.map((term, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{term.code}</td>
              <td>{term.name}</td>
              <td>
                <Button variant="primary">Xem</Button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </Table>
      <div className="text-align">
        <PaginationControl
          page={page}
          between={4}
          total={10}
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
export default TARecruitmentMainPage;
