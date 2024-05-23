import { useEffect, useState } from "react";
import { Col, Tab, Tabs } from "react-bootstrap";
import SearchInput from "@main/components/generic/SearchInput";
import AccountsList from "@main/components/lists/AccountsList";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Role } from "@main/types/user.type";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getUsersList, selectUsersList, setRequest } from "@redux/slices/users.slice";
import "@main/index.css";

const AccountMainPage = () => {
  const dispatch = useAppDispatch();
  const usersResponse = useAppSelector(selectUsersList)

  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(Role.Student);

  useEffect(() => {
    const request = {
      page,
      role: tab === Role.Assistant ? Role.Student : tab,
      isAssistant: tab === Role.Assistant,
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
          <Tab eventKey={Role.Teacher} title="Giảng viên">
            <AccountsList actionEnabled={true} />
          </Tab>
          <Tab eventKey={Role.Assistant} title="Trợ giảng">
            <AccountsList actionEnabled={true} />
          </Tab>
        </Tabs>
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
      </div>
    </>
  );
};

export default AccountMainPage;
