import React, { useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import {
  addTask,
  deleteTask,
  getTasks,
  openTasksPrompt,
  saveTasks,
  selectIsOpenTasksPrompt,
  selectTasks,
  updateTask,
} from "@redux/slices/tasks.slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { ITaskItem, TaskAction } from "@main/types/task.type";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { selectCurrentRole } from "@redux/slices/authentication.slice";
import { Role } from "@main/types/user.type";
import DropzoneComponent from "../dropzone/Dropzone";
import { Attachment } from "@main/types/application-form.type";

const TasksPrompt = () => {
  const dispatch = useAppDispatch();

  const role = useAppSelector(selectCurrentRole);
  const isTasksPromptOpen = useAppSelector(selectIsOpenTasksPrompt);
  const tasks = useAppSelector(selectTasks);

  const [inputValue, setInputValue] = useState("");

  const [edittingTask, setEdittingTask] = useState<string>();
  const [edittingValue, setEdittingValue] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>();

  const actionWrapper = (innerAction: () => void) => {
    return () => {
      if (edittingTask !== undefined) {
        dispatch(
          showMessageDialog({
            message:
              "Bạn có muốn lưu nội dung nhiệm vụ hiện tại và để thực hiện hành động mới không?",
            primaryButtonText: "Có",
            onPrimaryButtonClick: innerAction,
            secondaryButtonText: "Không",
          })
        );
      } else {
        innerAction();
      }
    };
  };

  const handleAddTask = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    return actionWrapper(() => {
      dispatch(addTask(inputValue));
      setInputValue("");
    })();
  };

  const handleDelete = (index: number) => {
    return () => {
      dispatch(deleteTask(index));
      setEdittingTask(undefined);
      setEdittingValue("");
    };
  };

  const openEditMode = ({ _id, content }: ITaskItem) => {
    return actionWrapper(() => {
      setEdittingTask(_id!);
      setEdittingValue(content);
    });
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
    dispatch(openTasksPrompt(false));
  };

  const onSaveButtonClick = async () => {
    await dispatch(saveTasks());
    await dispatch(getTasks());
    onHide();
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={isTasksPromptOpen}
        onHide={onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Nhiệm vụ của trợ giảng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {role === Role.Teacher && (
            <Form onSubmit={(e) => handleAddTask(e)}>
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
          )}
          <div className="container">
            {tasks
              .filter((task) => task.state !== TaskAction.Delete)
              .map((task, index) => (
                <Row>
                  <Col sm={1}>
                    <Form.Check aria-label="option" />
                  </Col>
                  <Col sm={8}>
                    {role === Role.Teacher &&
                    edittingTask === task._id &&
                    edittingTask !== undefined ? (
                      <Form.Control
                        value={edittingValue}
                        onChange={(e) => setEdittingValue(e.target.value)}
                      />
                    ) : (
                      <>{task.content}</>
                    )}
                  </Col>
                  <Col sm={3}>
                    {edittingTask === task._id && edittingTask !== undefined ? (
                      <Button variant="link" onClick={closeEditMode(task._id!)}>
                        Hoàn tất
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="link"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="File đính kèm"
                          onClick={() => setAttachments(task.attachments ?? [])}
                        >
                          <Image
                            src="/images/attach-file.png"
                            height={20}
                          ></Image>
                        </Button>
                        {role === Role.Teacher && (
                          <>
                            <Button
                              variant="link"
                              onClick={openEditMode(task)}
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Chỉnh sửa"
                            >
                              <Image src="/images/edit.png" height={20}></Image>
                            </Button>
                            <Button
                              variant="link"
                              onClick={handleDelete(index)}
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Xóa"
                            >
                              <Image
                                src="/images/delete.png"
                                height={20}
                              ></Image>
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </Col>
                </Row>
              ))}
          </div>
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
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={attachments !== undefined}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            File đính kèm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropzoneComponent allowEdit={true} files={attachments} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setAttachments(undefined)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TasksPrompt;
