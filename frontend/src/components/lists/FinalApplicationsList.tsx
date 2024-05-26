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
            <th>{index + 1}</th>
            <th>{application.name}</th>
            <th>{application.code}</th>
            <th>{application.description}</th>
            <th>{application.stage2Approval ? "Đã đậu" : "Chờ liên hệ"}</th>
            <th>
              <Button
                variant="primary"
                onClick={showApprovalDialog(application._id)}
              >
                Approve
              </Button>
            </th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
