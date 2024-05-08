import DropzoneComponent from "../../components/dashboard/ImportDropZone";
import "../../index.css";
import ImportButton from "../../components/buttons/ImportButton";

const ImportSectionClassList = () => {
  const handleFileAdded = (file: File) => {
    console.log("File added:", file);
  };
  return (
    <div>
      <h2 className="display-5 mt-2 mb-3">Import danh sách lớp học phần</h2>
      <div className="shadow p-5 rounded-5 bg-white"> 
      <DropzoneComponent onFileAdded={handleFileAdded} />
        <ImportButton />
      </div>
    </div>
  );
};

export default ImportSectionClassList;
