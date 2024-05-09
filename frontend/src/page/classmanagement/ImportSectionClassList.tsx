import DropzoneComponent, { DropzoneComponentMethodsRef } from "../../components/dropzone/Dropzone";
import ImportButton from "../../components/buttons/ImportButton";
import DownloadImportTemplateLink from "../../components/links/DownloadImportTemplateLink";
import { useRef } from "react";
import "../../index.css";
import { useAppDispatch } from "../../features/hooks";
import { importTermsData } from "../../features/slices/terms.slice";
import { unwrapResult } from "@reduxjs/toolkit";

const ImportSectionClassList = () => {
  const dropzoneRef = useRef<DropzoneComponentMethodsRef>(null)

  const dispatch = useAppDispatch()

  const onClickImport = () => {
    if (!dropzoneRef.current) {
      return Promise.reject()
    }

    const files = dropzoneRef.current.getFiles()

    const formData = new FormData()

    formData.append('file', files[0])

    return dispatch(importTermsData(formData)).then(unwrapResult)
  }

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Import danh sách lớp học phần</h2>
      <div className="shadow p-5 rounded-5 bg-white">
        <DownloadImportTemplateLink />
        <DropzoneComponent ref={dropzoneRef} />
        <ImportButton importFileAction={onClickImport} url="/class-management/class-list" />
      </div>
    </div>
  );
};

export default ImportSectionClassList;
