import { useAppDispatch } from "@redux/hooks";
import {
  approveFinal,
  getApplicationsFinalData,
} from "@redux/slices/application.slice";
import { ApplicationForm } from "@main/types/application-form.type";
import { Button, Table } from "react-bootstrap";

type FinalApplicationsListProps = {
  applications: ApplicationForm[];
};

export const FinalApplicationsList = ({
  applications,
}: FinalApplicationsListProps) => {
  const dispatch = useAppDispatch();

  const showApprovalDialog = (id: string) => {
    return async () => {
      await dispatch(approveFinal(id));
      await dispatch(getApplicationsFinalData());
    };
  };

  return (
    <Table responsive>
      <thead>
        <tr className="table-header ">
          <th>TT</th>
          <th>Tên sinh viên</th>
          <th>MSSV</th>
          <th>Email</th>
          <th>Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{application.name}</td>
            <td>{application.code}</td>
            <td>{application.description}</td>
            <td>{application.stage2Approval ? "Đã đậu" : "Chờ liên hệ"}</td>
            {!application.stage2Approval && (
              <td>
                <Button
                  variant="primary"
                  onClick={showApprovalDialog(application._id)}
                >
                  Approve
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
