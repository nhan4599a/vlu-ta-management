import { useEffect, useState } from "react";
import AccountsList from "@main/components/lists/AccountsList";
import { Button, Col, Row, Image } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getUsersList, selectUsersList } from "@redux/slices/users.slice";
import { exportEligibleList } from "@redux/slices/application.slice";
import { unwrapResult } from "@reduxjs/toolkit";

const TAEligiblePage = () => {
  const dispatch = useAppDispatch();
  const usersResponse = useAppSelector(selectUsersList);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getUsersList({
        page,
        needEducated: true,
      })
    );
  }, [dispatch, page]);

  const exportData = () => {
    dispatch(exportEligibleList())
      .then(unwrapResult)
      .then((blob) => {
        const tag = document.createElement("a");
        const url = URL.createObjectURL(blob);
        tag.href = url;
        tag.download = "Danh sách đào tạo trợ giảng.xlsx";
        tag.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 0);
      });
  };

  return (
    <>
      <h2 className="display-5 mt-2 mb-3">Danh sách sinh viên đủ điều kiện</h2>
      <Row>
        <Col xl={2}>
          <Button variant="primary" onClick={exportData}>
            <Image src="/images/download.png" height={20}></Image>
            Tải xuống danh sách
          </Button>
        </Col>
        <Col xl={2}>
          <Button variant="primary">
            <Image src="/images/send.png" height={20}></Image>
            Gửi email
          </Button>
        </Col>
      </Row>
      <AccountsList actionEnabled={false} />
      <div className="text-align">
        <PaginationControl
          page={page}
          between={4}
          total={usersResponse.count}
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

export default TAEligiblePage;
