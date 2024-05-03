import { Table } from "react-bootstrap";
import "../../index.css";
const SectionClassList = () => {
  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Danh sách lớp học phần</h2>
      <Table responsive>
        <thead>
          <tr className="table-header ">
            <th>TT</th>
            <th>Mã LHP</th>
            <th>Tên HP</th>
            <th>Số TC</th>
            <th>Loại HP</th>
            <th>Thứ</th>
            <th>Tiết học</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1 232_71ITSE41603_01</td>
            <td>Thiết kế kiến trúc phần mềm</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
          <tr>
            <td>2</td>
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SectionClassList;
