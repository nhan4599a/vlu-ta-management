import { useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import { useAppDispatch } from "@redux/hooks";
import { logout, postLoginCallback, setAccessToken } from "@main/features/slices/authentication.slice";
import { Role } from "@main/types/user.type";
import { unwrapResult } from "@reduxjs/toolkit";
import "@main/index.css";
import { setCurrentSetting } from "@main/features/slices/setting.slice";

const Login = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  const login = (role: Role) => {
    return () => {
      console.log('ok')
      dispatch(setAccessToken(`${Role[role]}`))
      dispatch(postLoginCallback())
        .then(unwrapResult)
        .then((user) => {
          window.location.href = '/'
          dispatch(setCurrentSetting(user.currentSetting))
          dispatch(setAccessToken(`${Role[role]}-${user._id}`))
        })
    }
  }

  return (
    <div className="login-container">
      <div className="login-illustrator">
        <h2 className="mt-5 ms-5 display-1 text-uppercase fw-bolder">
          Website quản lý trợ giảng
        </h2>
        <Image
          src="/images/main-illustrator.png"
          alt="login"
        />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center login-action">
        <h2 className="position-relative display-4 fw-bolder">Đăng nhập</h2>
        <Button className="btn-lg my-2" onClick={login(Role.Student)} variant="primary">
          Sinh viên
        </Button>
        <Button className="btn-lg my-2" onClick={login(Role.Teacher)} variant="primary">
          Giảng viên 
        </Button>
        <Button className="btn-lg mt-2 mb-4" onClick={login(Role.StudentAssociate)} variant="primary">
          Công tác sinh viên
        </Button>
        <p>Đăng nhập bằng tài khoản Văn Lang để bắt đầu</p>
      </div>
    </div>
  );
};

export default Login;
