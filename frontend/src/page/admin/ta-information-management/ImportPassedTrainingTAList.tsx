import DropzoneComponent, {
  DropzoneComponentMethodsRef,
} from "@main/components/dropzone/Dropzone";
import ImportButton from "@main/components/buttons/ImportButton";
import { useRef } from "react";
import "@main/index.css";
import { useAppDispatch } from "@main/features/hooks";
import { importStudentDataList } from "@main/features/slices/application.slice";
import { unwrapResult } from "@reduxjs/toolkit";

const ImportPassedTrainingTAList = () => {
  const dropzoneRef = useRef<DropzoneComponentMethodsRef>(null);

  const dispatch = useAppDispatch();

  const onClickImport = () => {
    if (!dropzoneRef.current) {
      return Promise.reject();
    }

    const files = dropzoneRef.current.getFiles();

    const formData = new FormData();

    formData.append("file", files[0]);

    return dispatch(importStudentDataList(formData))
      .then(unwrapResult);
  };

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">
        Import danh sách sinh viên đã hoàn thành khóa đào tạo làm trợ lý giảng
        dạy
      </h2>
      <div className="shadow p-5 rounded-5 bg-white">
        <DropzoneComponent
          ref={dropzoneRef}
          acceptedFiles=".xlsx,.xls"
          maxFiles={1}
          allowEdit={true}
        />
        <ImportButton
          url="/ta-information-management/final"
          importFileAction={onClickImport}
        />
      </div>
    </div>
  );
};

export default ImportPassedTrainingTAList;
