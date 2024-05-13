import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  activeUser,
  getUsersList,
  selectSelectedUser,
  setSelectedUser,
} from "../../features/slices/users.slice";

const ConfirmDelete = () => {
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
        <Button variant="primary" onClick={onActionButtonClick}>
          Xác nhận
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDelete;
