import { ApplicationForm } from "@main/types/application-form.type";
import { Button, Table } from "react-bootstrap";

type TeacherAssistanntsListProps = {
  applications: ApplicationForm[];
};

export const TeacherAssistantsList = ({
  applications
}: TeacherAssistanntsListProps) => {
  
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
            <th>{index + 1}</th>
            <th>{application.name}</th>
            <th>{application.code}</th>
            <th>{application.description}</th>
            <th>
              <Button variant="primary">Xem</Button>
            </th>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};