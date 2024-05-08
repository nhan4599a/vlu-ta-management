import React, { useEffect } from 'react';
import Dropzone from 'dropzone';

interface DropzoneProps {
  onFileAdded: (file: File) => void;
}
const DropzoneComponent: React.FC<DropzoneProps> = ({ onFileAdded }) => {
  useEffect(() => {
    const dropzone = new Dropzone("#my-dropzone", {
      acceptedFiles: '.xlsx',
      maxFiles: 1,
      autoProcessQueue: false,
    });
    dropzone.on("addedfile", (file) => {
      onFileAdded(file);
    });

    return () => {
      dropzone.destroy();
    };
  }, [onFileAdded]);

  return (
    <div id="my-dropzone" className="dropzone">
      <div className="dz-message">Drag 'n' drop an .xlsx file here, or click to select one</div>
    </div>
  );
};

export default DropzoneComponent;
