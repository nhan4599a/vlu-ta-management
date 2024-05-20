import { Form } from "react-bootstrap";
import "@main/index.css"

const SearchInput = () => {
  return <Form.Control className="search-input shadow-sm mb-3" type="text" placeholder="Tìm tài khoản" />;
};

export default SearchInput;
