import React, { useRef, useState } from "react";
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
  markAsCompleted as markAsCompletedAction,
  attachFile,
} from "@redux/slices/tasks.slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { ITaskItem, TaskAction } from "@main/types/task.type";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { selectCurrentRole } from "@redux/slices/authentication.slice";
import { Role } from "@main/types/user.type";
import DropzoneComponent, {
  DropzoneComponentMethodsRef,
} from "../dropzone/Dropzone";
import { Attachment } from "@main/types/application-form.type";
import { unwrapResult } from "@reduxjs/toolkit";

const TasksPrompt = () => {
  const dispatch = useAppDispatch();

  const role = useAppSelector(selectCurrentRole);
  const isTasksPromptOpen = useAppSelector(selectIsOpenTasksPrompt);
  const tasks = useAppSelector(selectTasks);

  const [inputValue, setInputValue] = useState("");

  const [edittingTask, setEdittingTask] = useState<string>();
  const [edittingValue, setEdittingValue] = useState("");
  const [attachments, setAttachments] = useState<Attachment[] | File[]>();

  const attachmentTaskIdRef = useRef<string>();
  const dropzoneRef = useRef<DropzoneComponentMethodsRef>(null);

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

  const markAsCompleted = (taskId: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        markAsCompletedAction({
          taskId: taskId,
          isCompleted: e.target.checked,
        })
      );
    };
  };

  const openAttachment = ({ _id, attachments }: ITaskItem) => {
    return () => {
      attachmentTaskIdRef.current = _id!;
      setAttachments(attachments ?? []);
    };
  };

  const closeAttachmentDialog = () => {
    dispatch(
      attachFile({
        taskId: attachmentTaskIdRef!.current!,
        attachments: dropzoneRef.current!.getFiles(),
      })
    );
    attachmentTaskIdRef!.current = undefined;
    setAttachments(undefined);
  };

  const onSaveButtonClick = () => {
    dispatch(saveTasks())
      .then(unwrapResult)
      .then(() => {
        dispatch(
          showMessageDialog({
            message: "Lưu nhiệm vụ thành công",
            onPrimaryButtonClick() {
              dispatch(getTasks());
              onHide();
            },
          })
        );
      });
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
                <Row
                  style={{
                    background: task.isCompleted ? "lightgray" : "#dee2e6",
                  }}
                  key={task._id}
                >
                  <Col sm={1} className="d-flex align-items-center">
                    <Form.Check
                      aria-label="option"
                      disabled={role === Role.Teacher}
                      checked={task.isCompleted}
                      onChange={markAsCompleted(task._id!)}
                    />
                  </Col>
                  <Col sm={8} className="d-flex align-items-center">
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
                          onClick={openAttachment(task)}
                        >
                          <Image
                            src="/images/attach-file.png"
                            height={20}
                          ></Image>
                        </Button>
                        {role === Role.Teacher && !task.isCompleted && (
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
          <Button variant="light" onClick={onHide}>
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
        onHide={() => setAttachments(undefined)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            File đính kèm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropzoneComponent
            allowDownload={true}
            allowEdit={true}
            files={attachments}
            ref={dropzoneRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeAttachmentDialog}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TasksPrompt;
