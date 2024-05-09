import React from "react";
import { Col, Tab, Tabs } from "react-bootstrap";
import "../../../index.css";
import SearchInput from "../../../components/generic/SearchInput";
import AccountsList from "../../../components/lists/AccountsList";
import Pagination from "../../../components/pagination/Pagination";

const AccountMainPage = () => {
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
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default AccountMainPage;
