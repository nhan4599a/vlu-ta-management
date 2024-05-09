import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TARegister from "../promts/TARegister";

const TARegisterButton = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button
        variant="primary"
        className="w-100"
        onClick={() => setModalShow(true)}
      >
        Đăng ký
      </Button>
      <TARegister
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TARegisterButton;
