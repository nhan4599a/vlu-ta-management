import { useAppDispatch } from "@redux/hooks";
import { getApplicationInfo, getTermClassInfo, setApplicationId } from "@redux/slices/application.slice";
import { ApplicationForm } from "@main/types/application-form.type";
import { Button, Table } from "react-bootstrap";

type TeacherAssistanntsListProps = {
  applications: ApplicationForm[];
};

export const TeacherAssistantsList = ({
  applications
}: TeacherAssistanntsListProps) => {
  const dispatch = useAppDispatch()

  const showApprovalDialog = (application: ApplicationForm) => {
    return async () => {
      dispatch(setApplicationId(application._id))

      await Promise.all([
        dispatch(getTermClassInfo(application.scheduleId)),
        dispatch(getApplicationInfo())
      ])
    }
  }
  
  return (
    <Table responsive>
      <thead>
        <tr className="table-header ">
          <th>TT</th>
          <th>Tên sinh viên</th>
          <th>MSSV</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{application.name}</td>
            <td>{application.code}</td>
            <td>{application.email}</td>
            <td>
              <Button variant="primary" onClick={showApprovalDialog(application)}>Xem</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
