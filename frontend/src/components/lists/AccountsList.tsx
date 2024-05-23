import { Table } from "react-bootstrap";
// import ConfirmDelete from "@main/components/prompts/ConfirmDelete";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUsersList, setSelectedUser } from "@redux/slices/users.slice";
import { IUser } from "@main/types/user.type";
import "@main/index.css";

type AccountsListProps = {
  actionEnabled: boolean;
};

const AccountsList = ({ actionEnabled }: AccountsListProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);

  const onActionButtonClick = ({ _id, active }: IUser) => {
    return () => {
      dispatch(
        setSelectedUser({
          id: _id,
          active,
        })
      );
    };
  };

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
            {actionEnabled && <th></th>}
          </tr>
        </thead>
        <tbody>
          {users.data.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.code}</td>
              <td>{user.class}</td>
              {actionEnabled && (
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
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AccountsList;
