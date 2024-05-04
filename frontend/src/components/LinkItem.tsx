import React from 'react';
import { Link } from 'react-router-dom';

type LinkItemProps = React.PropsWithChildren & {
    to: string
  }
const LinkItem = ({to, children}: LinkItemProps) => {
    return (
        <Link to={to} className="nav-link">{children}</Link>
    );
};

export default LinkItem;