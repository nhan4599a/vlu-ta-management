import React from "react";
import { Form } from "react-bootstrap";
import "../../index.css"

const SearchInput = () => {
  return <Form.Control className="search-input shadow-sm mb-3" type="text" placeholder="Tìm tài khoản" />;
};

export default SearchInput;
