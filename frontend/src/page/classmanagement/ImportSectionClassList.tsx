import DropzoneComponent, { DropzoneComponentMethodsRef } from "../../components/dropzone/Dropzone";
import "../../index.css";
import ImportButton from "../../components/buttons/ImportButton";
import DownloadImportTemplateLink from "../../components/buttons/DownloadImportTemplateLink";
import { useRef } from "react";

const ImportSectionClassList = () => {
  const dropzoneRef = useRef<DropzoneComponentMethodsRef>()

  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Import danh sách lớp học phần</h2>
      <div className="shadow p-5 rounded-5 bg-white">
        <DownloadImportTemplateLink />
        <DropzoneComponent ref={dropzoneRef} />
        <ImportButton />
      </div>
    </div>
  );
};

export default ImportSectionClassList;
