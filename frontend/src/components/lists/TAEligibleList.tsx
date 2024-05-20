import { useAppSelector } from "@main/features/hooks";
import { selectUsersList } from "@main/features/slices/users.slice";
import { Button, Table } from "react-bootstrap";

const TAEligibleList = () => {
    const users = useAppSelector(selectUsersList);
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>TT</th>
          <th>Họ tên</th>
          <th>MSSV</th>
          <th>Email</th>
          <th>Lớp</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.data.map((user, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.code}</td>
            <td>{user.email}</td>
            <td>{user.class}</td>
            <td>
                <Button variant="link">Xem</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TAEligibleList;
