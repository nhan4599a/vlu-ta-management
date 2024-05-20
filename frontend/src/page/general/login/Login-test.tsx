import { useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { constant } from "@main/constants";
import { useAppDispatch } from "@redux/hooks";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { logout } from "@main/features/slices/authentication.slice";
import "@main/index.css";


const Login = () => {
  const { instance } = useMsal()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  const login = () => {
    instance.loginRedirect(constant.authentication.loginRequest)
      .catch(() => {
        dispatch(showMessageDialog('Failed to login'))
      })
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
        <Button className="btn-lg my-2" onClick={login} variant="primary">
          Sinh viên
        </Button>
        <Button className="btn-lg my-2" onClick={login} variant="primary">
          Giảng viên 
        </Button>
        <Button className="btn-lg mt-2 mb-4" onClick={login} variant="primary">
          Công tác sinh viên
        </Button>
        <p>Đăng nhập bằng tài khoản Văn Lang để bắt đầu</p>
      </div>
    </div>
  );
};

export default Login;
