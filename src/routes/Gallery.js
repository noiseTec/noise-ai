import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import { getDownloadURL, listAll } from "firebase/storage";
import {
  galleryBigListRef,
  galleryLongListRef,
  gallerySquareListRef,
  galleryTallListRef,
} from "../constants/appConstant";

const Gallery = () => {
  const [verticalImageList, setVerticalImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAll(galleryBigListRef).then((res) => {
      res.items.forEach((el) => {
        getDownloadURL(el).then((url) => {
          setVerticalImageList((curr) => [...curr, url]);
        });
      });
    });

    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="flex w-full  h-full items-center justify-center overflow-auto pb-4">
        <div
          id="gallery-container"
          className="h-full w-full px-6 sm:max-w-screen-md grid grid-flow-dense gap-2 justify-center"
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
              {/* Square */}
              {verticalImageList.map((el, idx) => (
                <div className="flex items-center justify-center" key={idx}>
                  <img
                    src={el}
                    alt=""
                    className="w-full h-full object-cover "
                  />
                </div>
              ))}
              {/* Dai */}
              {verticalImageList.map((el, idx) => (
                <div
                  className="flex col-span-2 items-center justify-center"
                  key={idx}
                >
                  <img
                    src={el}
                    alt=""
                    className="w-full h-full object-cover "
                  />
                </div>
              ))}
              {/* Cao */}
              {verticalImageList.map((el, idx) => (
                <div
                  className="flex row-span-2 items-center justify-center"
                  key={idx}
                >
                  <img
                    src={el}
                    alt=""
                    className="w-full h-full object-cover "
                  />
                </div>
              ))}
              {/* Bu */}
              {verticalImageList.map((el, idx) => (
                <div
                  className="flex col-span-2 row-span-2 items-center justify-center"
                  key={idx}
                >
                  <img
                    src={el}
                    alt=""
                    className="w-full h-full object-cover "
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
