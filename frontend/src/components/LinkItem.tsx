import React from "react";
import { Link } from "react-router-dom";

type LinkItemProps = React.PropsWithChildren & {
  to: string;
  isActive?: boolean;
};
const LinkItem = ({ to, children, isActive }: LinkItemProps) => {
  return (
    <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
      {children}
    </Link>
  );
};

export default LinkItem;
