import {  Image, Button } from "react-bootstrap";
import "../index.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-illustrator">
        <h2 className="position-relative display-1 text-uppercase fw-bolder">Website quản lý trợ giảng</h2>
        <Image
        className="position-relative"
          src="/images/main-illustrator.png"
          alt="login"
        />
      </div>
      <div className="login-action">
        <h2 className="position-relative display-4 fw-bolder">Đăng nhập</h2>
        <Button className="btn-lg" href="../../" variant="primary">
          Đăng nhập</Button>
        <p>Đăng nhập bằng tài khoản Văn Lang để bắt đầu</p>
      </div>
    </div>
  );
};

export default Login;
