import React from "react";
import { Button, Modal } from "react-bootstrap";

const ImportSuccessPrompt = () => {
  return (
    <div style={{ display: "block", width: 700, padding: 30 }}>
      <h4>React-Bootstrap Modal Component</h4>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Sample Modal Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the sample text for our Modal</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default ImportSuccessPrompt;
