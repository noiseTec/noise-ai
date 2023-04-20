import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import { getDownloadURL, listAll } from "firebase/storage";
import { galleryListRef } from "../constants/appConstant";

const Gallery = () => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAll(galleryListRef).then((res) => {
      res.items.forEach((el) => {
        getDownloadURL(el).then((url) => {
          setImageList((curr) => [...curr, url]);
        });
      });
    });
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="flex w-full  h-full items-center justify-center overflow-auto pb-4">
        <div
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gridAutoRows: "200px",
          }}
          className="h-full w-full px-6 sm:max-w-screen-lg grid grid-flow-dense gap-4 "
        >
          {loading ? (
            <>
              <div className="animate-pulse bg-neutral-900"></div>
              <div className="animate-pulse bg-neutral-900"></div>
              <div className="animate-pulse bg-neutral-900 row-span-2"></div>
              <div className="animate-pulse bg-neutral-900 col-span-2 row-span-2"></div>
              <div className="animate-pulse bg-neutral-900 col-span-2"></div>
              <div className="animate-pulse bg-neutral-900"></div>
              <div className="animate-pulse bg-neutral-900"></div>
              <div className="animate-pulse bg-neutral-900 col-span-2"></div>
              <div className="animate-pulse bg-neutral-900"></div>
              <div className="animate-pulse bg-neutral-900"></div>
            </>
          ) : (
            <>
              {imageList.map((el, idx) => (
                <div
                  className="row-span-2 flex items-center justify-center"
                  key={idx}
                >
                  <img
                    src={el}
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
