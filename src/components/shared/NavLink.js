import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ url, selected }) => {
  return (
    <Link to={url}>
      <div className="font-semibold text-sm sm:text-xl uppercase">{url}</div>
      {selected && (
        <motion.div
          className="w-full h-0.5 bg-white"
          layoutId="underline"
        />
      )}
    </Link>
  );
};

export default NavLink;
