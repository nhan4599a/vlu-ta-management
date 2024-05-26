import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@main/features/hooks";
import {
  getTermsDataList,
  selectTermsData,
  setCurrentPage,
} from "@main/features/slices/terms.slice";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import LinkItem from "@main/components/LinkItem";

const ClassWithTA = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(getTermsDataList());
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
                  <Button variant="primary">
                    <LinkItem to="">Xem danh sách trợ giảng</LinkItem>
                  </Button>
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
