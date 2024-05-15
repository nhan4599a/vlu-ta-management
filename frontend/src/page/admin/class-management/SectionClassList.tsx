import { Button, Table } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { getTermsDataList } from "../../../features/slices/terms.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { TermDataItem } from "../../../types/term.type";
import RecruimentPromt from "../../../components/promts/RecruimentPromt";
import {
  GetRecruimentPayload,
  getRecuimentInfo,
  setGetDataPayload,
} from "../../../features/slices/recruiment.slice";
import { selectCurrentRole } from "../../../features/slices/authentication.slice";
import { Role } from "../../../types/user.type";
import "../../../index.css"

const SectionClassList = () => {
  const role = useAppSelector(selectCurrentRole);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [terms, setTerms] = useState<TermDataItem[]>([]);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(getTermsDataList(page))
      .then(unwrapResult)
      .then(({ data, count }) => {
        setTerms(data);
        setCount(count);
      });
  }, [dispatch, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchRecruimentInfo = (payload: GetRecruimentPayload) => {
    return () => {
      dispatch(setGetDataPayload(payload));
      dispatch(getRecuimentInfo());
    };
  };

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
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
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {terms.map((term, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{term.code}</td>
              <td>{term.name}</td>
              <td>{term.credits}</td>
              <td>{term.type}</td>
              <td>{term.day}</td>
              <td>{term.lesson}</td>
              <td>
                {role !== Role.Teacher || term.isApproved ? (
                  <></>
                ) : (
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={fetchRecruimentInfo({
                      id: term.id,
                      scheduleId: term.scheduleId,
                    })}
                  >
                    Yêu cầu trợ giảng
                  </Button>
                )}

                {role === Role.Admin &&
                !term.isRegistered &&
                !term.isApproved ? (
                  <Button
                    variant="primary"
                    className="w-100 mt-1"
                    onClick={fetchRecruimentInfo({
                      id: term.id,
                      scheduleId: term.scheduleId,
                    })}
                  >
                    Chấp nhận yêu cầu tuyển TA
                  </Button>
                ) : (
                  <></>
                )}

                {role === Role.Student &&
                term.isRegistered &&
                term.isApproved ? (
                  <Button
                    variant="primary"
                    className="w-100 mt-1"
                    onClick={fetchRecruimentInfo({
                      id: term.id,
                      scheduleId: term.scheduleId,
                    })}
                  >
                    Ứng tuyển
                  </Button>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
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
      <RecruimentPromt afterSubmitCallback={fetchData} />
    </div>
  );
};

export default SectionClassList;
