import { useRef } from "react";
import DropzoneComponent from "../../components/dashboard/ImportDropZone";
import "../../index.css";

const ImportSectionClassList = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };
  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Import danh sách lớp học phần</h2>
      <div className="shadow p-5 rounded-5 bg-white"> 
        <DropzoneComponent />
        <input ref={inputRef} className="d-none" type="file" />
        <button onClick={handleUpload} className="w-100 mt-3 btn btn-primary">
          Import
        </button>
      </div>
    </div>
  );
};

export default ImportSectionClassList;
