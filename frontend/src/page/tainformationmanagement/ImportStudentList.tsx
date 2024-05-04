import React, { useRef } from "react";
import "../../index.css";
import DropzoneComponent from "../../components/dashboard/ImportDropZone";

const ImportStudentList = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };
  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Import danh sách sinh viên đã hoàn thành khóa đào tạo làm trợ lý giảng dạy</h2>
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

export default ImportStudentList;
