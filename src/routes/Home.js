import React from "react";
import { Link } from "react-router-dom";
import noiseLogo from "../assets/logo.png";
import Layout from "../components/shared/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col w-full h-full items-center justify-center pb-10">
        <div className="grow flex items-center justify-center">
          <img src={noiseLogo} alt="noise-logo" className="max-h-[596px]" />
        </div>
        <Link
          to={"interactive"}
          className="flex items-center justify-center font-semibold uppercase mt-auto"
        >
          Enter Exhibition
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
