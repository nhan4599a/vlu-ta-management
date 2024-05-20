import SearchInput from "@main/components/generic/SearchInput";
import TAClassList from "@main/page/student/ta/TAClassList";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";

const TAEligiblePage = () => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">
        Sinh viên đủ điều kiện làm trợ giảng
      </h2>
      <Col xl={3}>
        <SearchInput />
      </Col>
      <TAClassList />
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
    </div>
  );
};

export default TAEligiblePage;
