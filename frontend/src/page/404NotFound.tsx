// import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const NotFound = () => {
  return (
    <div className="text-center ">
      <div className="py-5">
        <Image
          src={"/pngwing.com.png"}
          alt="not-found"
          style={{ width: "700px" }}
        />
      </div>
      <a href="/" className="display-6">
        <Image
          src="/4d0e71c6d259566f70101baa07154e47.png"
          alt="logo"
          style={{ width: "45px", marginRight: "10px" }}
        />
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
