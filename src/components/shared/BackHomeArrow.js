import React from "react";
import { Link } from "react-router-dom";
import { Arrow } from "../../assets/icon";

const BackHomeArrow = ({ className }) => {
  return (
    <Link
      to="/"
      className={
        `hover:-translate-x-3 text-lg bottom-4 left-4 flex items-center justify-center rounded-full duration-300 ` +
        className
      }
    >
      <Arrow className={""} />
    </Link>
  );
};

export default BackHomeArrow;
