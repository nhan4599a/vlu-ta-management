import { Button } from "react-bootstrap";
import ImportSuccessPrompt from "../promts/ImportSuccessPrompt";
import { useState } from "react";

const ImportButton = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        variant="primary"
        className="w-100 mt-5"
        onClick={() => setModalShow(true)}
      >
        Import
      </Button>
      <ImportSuccessPrompt
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default ImportButton;
