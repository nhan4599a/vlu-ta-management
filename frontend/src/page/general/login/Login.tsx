import { Image, Button } from "react-bootstrap";
import { useMsal } from "@azure/msal-react";
import { constant } from "@main/constants";
import { useAppDispatch } from "@redux/hooks";
import { showMessageDialog } from "@redux/slices/messages.slice";
import "@main/index.css";


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
      <div className="d-flex flex-column justify-content-center align-items-center login-action">
        <h2 className="position-relative display-4 fw-bolder">Đăng nhập</h2>
        <Button className="btn-lg mt-4 mb-5" onClick={login} variant="primary">
          Đăng nhập
        </Button>
        <p>Đăng nhập bằng tài khoản Văn Lang để bắt đầu</p>
      </div>
    </div>
  );
};

export default Login;
