import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  getTermsDataList,
  selectTermsData,
  setCurrentPage,
} from "@redux/slices/terms.slice";
import TARegister from "@main/components/prompts/TARegisterPrompt";

const TARecruitmentMainPage = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(getTermsDataList());
  }, [dispatch, page]);

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
      <Table responsive>
        <thead className="table-header">
          <tr>
            <th>TT</th>
            <th>Mã môn học</th>
            <th>Môn học</th>
            <th>Tiết</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {termsResponse.data.map((term, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{term.code}</td>
              <td>{term.name}</td>
              <td>{term.lesson}</td>
              <td>
                <Button variant="primary">Đăng ký</Button>
              </td>
            </tr>
          ))}
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
      <TARegister />
    </div>
  );
};
export default TARecruitmentMainPage;
