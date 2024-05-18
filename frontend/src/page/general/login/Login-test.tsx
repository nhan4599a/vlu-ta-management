import { Image, Button } from "react-bootstrap";
import { useAppDispatch } from "@redux/hooks";
import { Role } from "@main/types/user.type";
import { postLoginCallback, setAccessToken } from "@redux/slices/authentication.slice";
import "@main/index.css";
import { unwrapResult } from "@reduxjs/toolkit";

const Login = () => {
  const dispatch = useAppDispatch();

  const login = (role: Role) => {
    return async () => {
      dispatch(setAccessToken(Role[role]))
      await dispatch(postLoginCallback()).then(unwrapResult).then((userInfo) => {
        dispatch(setAccessToken(`${Role[role]}-${userInfo._id}`))
        window.location.href = '/'
      })
    }
  }

  return (
    <div className="login-container">
      <div className="login-illustrator">
        <h2 className="position-relative display-1 text-uppercase fw-bolder">
          Website quản lý trợ giảng
        </h2>
        <Image
          className="position-relative"
          src="/images/main-illustrator.png"
          alt="login"
        />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center login-action">
        <h2 className="position-relative display-4 fw-bolder">Đăng nhập</h2>
        <Button className="btn-sm mt-4 mb-5" onClick={login(Role.StudentAssociate)} variant="primary">
          Admin
        </Button>
        <Button className="btn-sm mt-4 mb-5" onClick={login(Role.Teacher)} variant="primary">
          Giảng viên
        </Button>
        <Button className="btn-sm mt-4 mb-5" onClick={login(Role.Student)} variant="primary">
          Sinh viên
        </Button>
        <p>Đăng nhập bằng tài khoản Văn Lang để bắt đầu</p>
      </div>
    </div>
  );
};

export default Login;
