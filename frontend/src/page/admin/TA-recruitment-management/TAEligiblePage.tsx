import React, { useState } from "react";
import AccountsList from "@main/components/lists/AccountsList";
import { Button, Col, Row, Image } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

const TAEligiblePage = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  return (
    <>
      <h2 className="display-5 mt-2 mb-3">Danh sách sinh viên đủ điều kiện</h2>
      <Row>
        <Col xl={2}>
          <Button variant="primary">
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
      <AccountsList />
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
    </>
  );
};

export default TAEligiblePage;
