import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ url, name }) => {
  return (
    <Link to={url}>
      <div className="font-semibold text-sm sm:text-xl uppercase">{name}</div>
    </Link>
  );
};

export default NavLink;
