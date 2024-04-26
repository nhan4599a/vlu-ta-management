import {  Image, Button } from "react-bootstrap";
import "../index.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-illustrator">
        <h2 className="position-relative display-1 text-uppercase fw-bolder">Website quản lý trợ giảng</h2>
        <Image
        className="position-relative"
          src="https://s3-alpha-sig.figma.com/img/eca2/0c49/af03af070e91980c391496da589f4978?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JTcsm26togZU0WdGK05DPQQVzgXCW77zBEnDFKRwkeUqihi65QR1Om3FZOS90W9TDCHE4w7BO4sfaqBYTvMLt7HGR8oGMqbzt8zUMx7KBMwT2fQiE0P615AznsWgJ6zEDXI~xfHM1pmh-d755fWP3bMmvIKPMyq~iVAS9hVc-cd6FwEynEq4pOjQxWzLmH3iQkRWtXL0mHYtwhOzxvbMNJIx-Mt81kP1wOrzJkYLk-9xAKxL~lRJg~vuCqh4qa6tP2tNn7W~~gQxgOYa5SqVxjTLj~rTWnCXNHv1Gp6zhw2XT~V9SQygKfDo~iex5RKESHgRB3CmVFdCSavpP4HbqA__"
          alt="login"
        />
      </div>
      <div className="login-action">
        <h2 className="position-relative display-4 fw-bolder">Đăng nhập</h2>
        <Button className="btn-lg" href="../page/Home" variant="primary">
          Đăng nhập</Button>
        <p>Đăng nhập bằng tài khoản Văn Lang để bắt đầu</p>
      </div>
    </div>
  );
};

export default Login;
