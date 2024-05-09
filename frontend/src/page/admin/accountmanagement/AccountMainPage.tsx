import { Col, Tab, Tabs } from "react-bootstrap";
import "../../../index.css";
import SearchInput from "../../../components/generic/SearchInput";
import AccountsList from "../../../components/lists/AccountsList";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useState } from "react";

const AccountMainPage = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <h2 className="display-5 mt-2 mb-3">Quản lý tài khoản</h2>
      <Col xl={3}>
        <SearchInput />
      </Col>
      <div className="rounded-3 pb-2 account-tabs">
        <Tabs defaultActiveKey="student" id="" className="mb-2" justify>
          <Tab eventKey="student" title="Sinh viên">
            <AccountsList />
          </Tab>
          <Tab eventKey="lecturer" title="Giảng viên">
            <AccountsList />
          </Tab>
          <Tab eventKey="ta" title="Trợ giảng">
            <AccountsList />
          </Tab>
        </Tabs>
        <div className="text-align">
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
        </div>
      </div>
    </>
  );
};

export default AccountMainPage;
