import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout";
import DetectorComponent from "../components/detector/DetectorComponent";
import HomepageComponent from "../components/artworks/HomepageComponent";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col w-full h-full items-center justify-center pb-10">
        <div className="grow flex items-center justify-center">
          <HomepageComponent />
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
