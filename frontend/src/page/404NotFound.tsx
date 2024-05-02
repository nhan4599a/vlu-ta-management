// import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const NotFound = () => {
  return (
    <div className="text-center ">
      <div className="py-5">
        <Image
          src={"/404.png"}
          alt="not-found"
          style={{ width: "700px" }}
        />
      </div>
      <a href="/" className="display-6">
        <Image
          src="/vlu-logo.png"
          alt="logo"
          style={{ width: "45px", marginRight: "10px" }}
        />
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
