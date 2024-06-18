import { Table } from "react-bootstrap";
// import ConfirmDelete from "@main/components/prompts/ConfirmDelete";
import { useAppSelector } from "@redux/hooks";
import { selectUsersList } from "@redux/slices/users.slice";
import { IUser } from "@main/types/user.type";
import "@main/index.css";

type AccountsListProps = {
  actionEnabled: boolean;
  actionButtonText?: string;
  onActionButtonClick?: (user: IUser) => void;
  assistantsMode: boolean;
};

const AccountsList = ({
  actionEnabled,
  actionButtonText,
  onActionButtonClick,
  assistantsMode,
}: AccountsListProps) => {
  const users = useAppSelector(selectUsersList);

  const internalOnActionButtonClick = (user: IUser) => {
    return () => {
      onActionButtonClick!(user);
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
            {assistantsMode && <th>SĐT</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.code}</td>
              <td>{user.class}</td>
              {assistantsMode && <td>{user.phoneNumber}</td>}
              <td>
                {actionEnabled && (
                  <a
                    className="link-opacity-100 me-2"
                    onClick={internalOnActionButtonClick(user)}
                  >
                    {actionButtonText}
                  </a>
                )}
                <a
                  className="btn btn-primary"
                  href={`/user-profile/${user._id}`}
                  target="_blank"
                >
                  Profile
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AccountsList;
