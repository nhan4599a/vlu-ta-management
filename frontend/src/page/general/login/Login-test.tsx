import { Image, Button } from "react-bootstrap";
import { useAppDispatch } from "../../../features/hooks";
import { Role } from "../../../types/user.type";
import { setUserInfo } from "../../../features/slices/authentication.slice";
import { v4 as uuidv4 } from "uuid"
import "../../../index.css";

const userIds = {
  0: uuidv4(),
  1: uuidv4(),
  2: uuidv4()
} as Record<Role, string>

const Login = () => {
  const dispatch = useAppDispatch();

  const login = (role: Role) => {
    return () => {
      dispatch(setUserInfo({
        _id: userIds[role],
        role: role,
        active: true,
        class: "PM2",
        code: userIds[role],
        email: `user-${role}@vanlanguni.edu.vn`,
        name: `user-${role}`
      }))
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
        <Button className="btn-sm mt-4 mb-5" onClick={login(Role.Admin)} variant="primary">
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
