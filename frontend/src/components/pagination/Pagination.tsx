import React, { useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import "../../index.css"

const Pagination = () => {
  const [page, setPage] = useState(1);
  return (
    <PaginationControl
      page={page}
      between={4}
      total={250}
      limit={10}
      changePage={(page) => {
        setPage(page);
      }}
      ellipsis={2}
    />
  );
};

export default Pagination;
