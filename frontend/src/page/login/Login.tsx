import { Image, Button } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { constant } from "../../constants";
import { useAppDispatch } from "../../features/hooks";
import { showMessageDialog } from "../../features/slices/messages.slice";
import "../../index.css";


const Login = () => {
  const { instance } = useMsal()
  const dispatch = useAppDispatch()

  const login = () => {
    instance.loginRedirect(constant.authentication.loginRequest)
      .catch(() => {
        dispatch(showMessageDialog('Failed to login'))
      })
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
      <div className="login-action">
        <h2 className="position-relative display-4 fw-bolder">Đăng nhập</h2>
        <Button className="btn-lg" onClick={login} variant="primary">
          Đăng nhập
        </Button>
        <p>Đăng nhập bằng tài khoản Văn Lang để bắt đầu</p>
      </div>
    </div>
  );
};

export default Login;