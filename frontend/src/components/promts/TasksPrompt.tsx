import React, { useState } from "react";
import { Button, Form, InputGroup, ListGroup, Modal } from "react-bootstrap";

const TasksPrompt = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleChange(e: {
    target: { value: React.SetStateAction<string> };
  }) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, inputValue]);
    setInputValue(" ");
  }

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const handleUpdate = (index, updatedValue) => {
    const newTodos = [...todos];
    newTodos[index] = updatedValue;
    setTodos(newTodos);
  };
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Nhiệm vụ của trợ giảng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Thêm nhiệm vụ:</Form.Label>
            <InputGroup size="lg">
              <Form.Control
                type="text"
                value={inputValue}
                onChange={handleChange}
              />
              <Button
                variant="outline-success"
                id="button-addtask"
                onClick={handleSubmit}
              >
                Thêm nhiệm vụ
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
        <ListGroup className="task-list">
          {todos.map((todo) => (
            <ListGroup.Item
              className="d-flex align-items-center justify-content-between"
              key={todo}
            >
              <div>
                <Form.Check aria-label="option" />
              </div>
              <div>{todo}</div>
              <div>
                <Button variant="link" onClick={() => handleUpdate()}>
                  Chỉnh sửa
                </Button>
                <Button variant="link" onClick={() => handleDelete()}>
                  Xóa
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Đóng
        </Button>
        <Button variant="primary">Lưu nhiệm vụ</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TasksPrompt;
