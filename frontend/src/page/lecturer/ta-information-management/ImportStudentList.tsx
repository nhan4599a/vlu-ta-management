import DropzoneComponent, { DropzoneComponentMethodsRef } from "../../../components/dropzone/Dropzone";
import ImportButton from "../../../components/buttons/ImportButton";
import { useRef } from "react";
import "../../../index.css";


const ImportStudentList = () => {
  const dropzoneRef = useRef<DropzoneComponentMethodsRef>()

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Import danh sách sinh viên đã hoàn thành khóa đào tạo làm trợ lý giảng dạy</h2>
      <div className="shadow p-5 rounded-5 bg-white">
        <DropzoneComponent ref={dropzoneRef} />
        <ImportButton url={""} importFileAction={function (): Promise<unknown> {
          throw new Error("Function not implemented.");
        } } />
      </div>
    </div>
  );
};

export default ImportStudentList;
