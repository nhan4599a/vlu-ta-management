import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getTermsDataList,
  selectTermsData,
  setCurrentPage,
} from "@redux/slices/terms.slice";

const AttendantList = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(getTermsDataList());
  }, [dispatch, page]);

  return (
    <>
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
                  {term.attendanceRecordFile ? (
                    <a
                      className="btn btn-primary"
                      target="_blank"
                      href={term.attendanceRecordFile}
                    >
                      Điểm danh
                    </a>
                  ) : (
                    "Chưa có link điểm danh"
                  )}
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

export default AttendantList;
