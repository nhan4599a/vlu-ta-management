// import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const Error500 = () => {
  return (
    <div className="text-center ">
      <div className="py-5">
        <Image
          src={"/images/500.png"}
          alt="500-server-error"
          style={{ width: "700px" }}
        />
      </div>
      <a href="/" className="display-6">
        <Image
          src="/images/vlu-logo.png"
          alt="logo"
          style={{ width: "45px", marginRight: "10px" }}
        />
        Go Home
      </a>
    </div>
  );
};

export default Error500;
