import React, { useState } from "react";
import { Button } from "react-bootstrap";
import UpdateInformationPromt from "../promts/UpdateInformationPromt";

const UpdateButton = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        variant="primary"
        className="w-100"
        onClick={() => setModalShow(true)}
      >
        Cập nhật
      </Button>
      <UpdateInformationPromt
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default UpdateButton;
