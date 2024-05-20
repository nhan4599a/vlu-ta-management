import DropzoneComponent, { DropzoneComponentMethodsRef } from "@main/components/dropzone/Dropzone";
import ImportButton from "@main/components/buttons/ImportButton";
import { useRef } from "react";
import "@main/index.css";


const ImportStudentList = () => {
  const dropzoneRef = useRef<DropzoneComponentMethodsRef>(null)

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Import danh sách sinh viên đã hoàn thành khóa đào tạo làm trợ lý giảng dạy</h2>
      <div className="shadow p-5 rounded-5 bg-white">
        <DropzoneComponent ref={dropzoneRef} acceptedFiles=".xlsx,.xls" maxFiles={1} allowEdit={true} />
        <ImportButton url={""} importFileAction={function (): Promise<unknown> {
          throw new Error("Function not implemented.");
        } } />
      </div>
    </div>
  );
};

export default ImportStudentList;
