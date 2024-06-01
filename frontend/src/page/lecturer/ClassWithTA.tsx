import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getTermsDataList,
  selectTermsData,
  setCurrentPage,
} from "@redux/slices/terms.slice";

const ClassWithTA = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(getTermsDataList({
      assistantsAvailableOnly: true
    }));
  }, [dispatch, page]);

  return (
    <>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp có trợ giảng</h2>
      <div>
        <Table responsive>
          <thead>
            <tr className="table-header ">
              <th>TT</th>
              <th>Mã LHP</th>
              <th>Tên HP</th>
              <th>Số TC</th>
              <th>Loại HP</th>
              <th>Thứ</th>
              <th>Tiết học</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {termsResponse.data.map((term, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{term.code}</td>
                <td>{term.name}</td>
                <td>{term.credits}</td>
                <td>{term.type}</td>
                <td>{term.day}</td>
                <td>{term.lesson}</td>
                <td>
                  <a
                    className="btn btn-primary"
                    href={`/class-management/assistants/${term.scheduleId}`}
                    target="_blank"
                  >
                    Xem danh sách trợ giảng
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
    </>
  );
};

export default ClassWithTA;
