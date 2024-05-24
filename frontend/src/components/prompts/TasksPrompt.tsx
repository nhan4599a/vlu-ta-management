import React, { useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import {
  addTask,
  deleteTask,
  getTasks,
  saveTasks,
  selectAssignee,
  selectTasks,
  setAssignee,
  updateTask,
} from "@redux/slices/tasks.slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { ITaskItem, TaskAction } from "@main/types/task.type";
import AttachmentButton from "../buttons/AttachmentButton";

const TasksPrompt = () => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectTasks);
  const assignee = useAppSelector(selectAssignee);

  const [inputValue, setInputValue] = useState("");

  const [edittingTask, setEdittingTask] = useState<string>();
  const [edittingValue, setEdittingValue] = useState("");

  const handleAddTask = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTask(inputValue));
    setInputValue("");
  };

  const handleDelete = (index: number) => {
    return () => {
      dispatch(deleteTask(index));
    };
  };

  const openEditMode = ({ _id, content }: ITaskItem) => {
    return () => {
      setEdittingTask(_id!);
      setEdittingValue(content);
    };
  };

  const closeEditMode = (taskId: string) => {
    return () => {
      dispatch(
        updateTask({
          taskId,
          content: edittingValue,
        })
      );

      setEdittingTask(undefined);
      setEdittingValue("");
    };
  };

  const onHide = () => {
    dispatch(setAssignee(undefined));
  };

  const onSaveButtonClick = async () => {
    await dispatch(saveTasks());
    await dispatch(getTasks());
    onHide();
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={assignee !== undefined}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Nhiệm vụ của trợ giảng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddTask}>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Thêm nhiệm vụ:</Form.Label>
            <InputGroup size="lg">
              <Form.Control
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                variant="outline-success"
                id="button-addtask"
                type="submit"
              >
                Thêm nhiệm vụ
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
        <ListGroup className="task-list">
          {tasks
            .filter((task) => task.state !== TaskAction.Delete)
            .map((task, index) => (
              <ListGroup.Item
                className="d-flex align-items-center justify-content-between"
                key={index}
              >
                <Row>
                  <Col sm={2}>
                    <Form.Check aria-label="option" />
                  </Col>
                  <Col sm={6}>
                    {edittingTask === task._id && edittingTask !== undefined ? (
                      <Form.Control
                        value={edittingValue}
                        onChange={(e) => setEdittingValue(e.target.value)}
                      />
                    ) : (
                      <>{task.content}</>
                    )}
                  </Col>
                  <Col sm={4}>
                    {edittingTask === task._id && edittingTask !== undefined ? (
                      <Button variant="link" onClick={closeEditMode(task._id!)}>
                        Hoàn tất
                      </Button>
                    ) : (
                      <div>
                        <AttachmentButton />
                        <Button
                          variant="link"
                          onClick={openEditMode(task)}
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Chỉnh sửa"
                        >
                          <Image src="/images/edit.png" height={20}></Image>
                        </Button>
                      </div>
                    )}
                    <Button
                      variant="link"
                      onClick={handleDelete(index)}
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Xóa"
                    >
                      <Image src="/images/delete.png" height={20}></Image>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={onSaveButtonClick}>
          Lưu nhiệm vụ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TasksPrompt;
