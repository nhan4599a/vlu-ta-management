import { Table } from "react-bootstrap";
import ConfirmDelete from "../prompts/ConfirmDelete";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { selectUsersList, setSelectedUser } from "../../features/slices/users.slice";
import "../../index.css";
import { IUser } from "../../types/user.type";

const AccountsList = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsersList);

  const onActionButtonClick = ({ _id, active }: IUser) => {
    return () => {
      dispatch(setSelectedUser({
        id: _id,
        active
      }))
    }
  }

  return (
    <>
      <Table responsive className="accounts-list">
        <thead>
          <tr className="table-header">
            <th>TT</th>
            <th>Mail</th>
            <th>Họ tên</th>
            <th>MSSV</th>
            <th>Lớp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.code}</td>
              <td>{user.class}</td>
              <td>
                <p>
                  <a
                    className="link-opacity-100"
                    onClick={onActionButtonClick(user)}
                  >
                    Xóa
                  </a>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmDelete />
    </>
  );
};

export default AccountsList;
