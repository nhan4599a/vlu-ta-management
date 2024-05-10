import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TARecruit from "../promts/TARecruit";

const TARecruitButton = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        variant="primary"
        className="w-100"
        onClick={() => setModalShow(true)}
      >
        Tuyển dụng
      </Button>
      <TARecruit
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TARecruitButton;
