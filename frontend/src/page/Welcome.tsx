import DropzoneComponent from "../components/dashboard/ImportDropZone";

const Welcome = () => {
  const handleFileAdded = (file: File) => {
    console.log("File added:", file);
  };

  return (
    <>
      <DropzoneComponent onFileAdded={handleFileAdded} />
      <h3 className="mt-2 ms-2">Welcome username!</h3>
    </>
  );
};

export default Welcome;
