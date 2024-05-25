import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  activeUser,
  getUsersList,
  selectSelectedUser,
  setSelectedUser,
} from "@redux/slices/users.slice";

const ConfirmDeletePrompt = () => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);

  const onHide = () => {
    dispatch(setSelectedUser(undefined));
  };

  const onActionButtonClick = () => {
    dispatch(activeUser()).then(() => {
      dispatch(getUsersList()).then(onHide);
    });
  };

  return (
    <Modal
      show={selectedUser !== undefined}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Xác nhận</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có muốn xóa người dùng này</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
        <Button variant="primary" onClick={onActionButtonClick}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeletePrompt;
