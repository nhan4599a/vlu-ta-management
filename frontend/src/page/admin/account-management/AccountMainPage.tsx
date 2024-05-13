import { Col, Tab, Tabs } from "react-bootstrap";
import "../../../index.css";
import SearchInput from "../../../components/generic/SearchInput";
import AccountsList from "../../../components/lists/AccountsList";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useEffect, useState } from "react";
import { Role } from "../../../types/user.type";
import { useAppDispatch } from "../../../features/hooks";
import { getUsersList, setRequest } from "../../../features/slices/users.slice";

const AccountMainPage = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(Role.Student);

  useEffect(() => {
    const request = {
      page,
      role: tab,
      isAssistant: false,
    };
    dispatch(setRequest(request));
    dispatch(getUsersList(request));
  }, [dispatch, tab, page]);

  return (
    <>
      <h2 className="display-5 mt-2 mb-3">Quản lý tài khoản</h2>
      <Col xl={3}>
        <SearchInput />
      </Col>
      <div className="rounded-3 pb-2 account-tabs">
        <Tabs
          activeKey={tab}
          onSelect={(k) => setTab(Number(k))}
          className="mb-2"
          justify
        >
          <Tab eventKey={Role.Student} title="Sinh viên">
            <AccountsList />
          </Tab>
          <Tab eventKey={Role.Teacher} title="Giảng viên">
            <AccountsList />
          </Tab>
          <Tab eventKey={Role.Student} title="Trợ giảng">
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
