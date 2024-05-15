import { Button } from "react-bootstrap";
import ImportSuccessPrompt from "../prompts/ImportSuccessPrompt";
import { useState } from "react";

type ImportButtonProps = {
  url: string,
  importFileAction: () => Promise<unknown>
}

const ImportButton = ({ url, importFileAction }: ImportButtonProps) => {
  const [modalShow, setModalShow] = useState(false);

  const onClick = () => {
    importFileAction().then(() => {
      setModalShow(true)
    })
  }

  return (
    <>
      <Button
        variant="primary"
        className="w-100 mt-5"
        onClick={onClick}
      >
        Import
      </Button>
      <ImportSuccessPrompt
        show={modalShow}
        url={url}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default ImportButton;
