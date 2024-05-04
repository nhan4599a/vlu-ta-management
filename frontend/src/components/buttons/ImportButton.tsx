import React from 'react';
import { Button } from 'react-bootstrap';
import ImportSuccessPrompt from '../Promt/ImportSuccessPrompt';

const ImportButton = () => {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button variant="primary" className="w-100 mt-5" onClick={() => setModalShow(true)}>
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