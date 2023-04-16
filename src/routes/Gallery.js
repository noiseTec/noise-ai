import React from "react";
import Layout from "../components/shared/Layout";

const Gallery = () => {
  return (
    <Layout>
      <div className="flex w-full h-full items-center justify-center overflow-auto pb-4">
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gridAutoRows: "200px",
          }}
          className="h-full w-full px-6 sm:max-w-screen-lg grid grid-flow-dense gap-4"
        >
          <div className=" bg-neutral-900 flex items-center justify-center"></div>
          <div className=" bg-neutral-900"></div>
          <div className=" bg-neutral-900 row-span-2"></div>
          <div className=" bg-neutral-900 col-span-2 row-span-2"></div>
          <div className=" bg-neutral-900 col-span-2"></div>
          <div className=" bg-neutral-900"></div>
          <div className=" bg-neutral-900"></div>
          <div className=" bg-neutral-900"></div>
          <div className=" bg-neutral-900"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
