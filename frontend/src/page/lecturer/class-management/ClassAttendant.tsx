import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getTermsDataList, selectTermsData, setCurrentPage, setCurrentSchedule } from "@redux/slices/terms.slice";
import AttendanceLinkPrompt from "@main/components/prompts/AttendanceLinkPrompt";
import { PaginationControl } from "react-bootstrap-pagination-control";

const ClassAttendant = () => {
  const dispatch = useAppDispatch();
  const termsResponse = useAppSelector(selectTermsData);
  
  const [page, setPage] = useState(1);

  const openAttendantPrompt = (index: number) => {
    return () => {
      dispatch(setCurrentSchedule(index));
    };
  };

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
                  <Button
                    variant="primary"
                    onClick={openAttendantPrompt(index)}
                  >
                    Cập nhật link điểm danh
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AttendanceLinkPrompt />
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

export default ClassAttendant;
