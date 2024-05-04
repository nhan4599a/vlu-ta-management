import "../../index.css";
import DropzoneComponent from "../../components/dashboard/ImportDropZone";
import ImportButton from "../../components/buttons/ImportButton";

const ImportStudentList = () => {
  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Import danh sách sinh viên đã hoàn thành khóa đào tạo làm trợ lý giảng dạy</h2>
      <div className="shadow p-5 rounded-5 bg-white">
        <DropzoneComponent />
        <ImportButton />
      </div>
    </div>
  );
};

export default ImportStudentList;
