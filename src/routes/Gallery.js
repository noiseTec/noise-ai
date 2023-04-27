import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import { getDownloadURL, listAll } from "firebase/storage";
import {
  galleryBigListRef,
  galleryLongListRef,
  gallerySquareListRef,
  galleryTallListRef,
} from "../constants/appConstant";
import { Greater } from "../assets/icon";
import { wrap } from "popmotion";

const Gallery = () => {
  const [bigImageList, setBigImageList] = useState([]);
  const [longImageList, setLongImageList] = useState([]);
  const [squareImageList, setSquareImageList] = useState([]);
  const [tallImageList, setTallImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const slideIndex = wrap(0, 3, page);

  useEffect(() => {
    listAll(galleryBigListRef).then((res) => {
      res.items.forEach((el) => {
        getDownloadURL(el).then((url) => {
          setBigImageList((curr) => [...curr, url]);
        });
      });
    });
    listAll(galleryLongListRef).then((res) => {
      res.items.forEach((el) => {
        getDownloadURL(el).then((url) => {
          setLongImageList((curr) => [...curr, url]);
        });
      });
    });
    listAll(gallerySquareListRef).then((res) => {
      res.items.forEach((el) => {
        getDownloadURL(el).then((url) => {
          setSquareImageList((curr) => [...curr, url]);
        });
      });
    });
    listAll(galleryTallListRef).then((res) => {
      res.items.forEach((el) => {
        getDownloadURL(el).then((url) => {
          setTallImageList((curr) => [...curr, url]);
        });
      });
    });

    setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <Layout>
      <div className="flex flex-col w-full h-full items-center justify-center pb-4 gap-4 px-6 overflow-auto">
        <div className="flex items-center justify-center gap-4 h-1/2 max-w-screen-lg w-full overflow-x-hidden">
          <button>
            <Greater className={"rotate-180"} />
          </button>
          <div
            id="slideshow-container"
            className="w-full flex items-center justify-center overflow-x-auto h-full"
          >
            {loading ? (
              <>
                <div className="animate-pulse bg-neutral-900  "></div>
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
                {bigImageList.map((el, idx) => (
                  <div
                    className="flex items-center justify-center overflow-hidden col-span-2 row-span-2"
                    key={idx}
                  >
                    <img src={el} className="w-full h-full object-cover" />
                  </div>
                ))}
                {longImageList.map((el, idx) => (
                  <div
                    className="flex items-center justify-center overflow-hidden col-span-2"
                    key={idx}
                  >
                    <img src={el} className="w-full h-full object-cover" />
                  </div>
                ))}
                {tallImageList.map((el, idx) => (
                  <div
                    className="flex items-center justify-center overflow-hidden row-span-2"
                    key={idx}
                  >
                    <img src={el} className="object-contain" />
                  </div>
                ))}
                {squareImageList.map((el, idx) => (
                  <div
                    className="flex items-center justify-center overflow-hidden"
                    key={idx}
                  >
                    <img src={el} className="w-full h-full object-cover" />
                  </div>
                ))}
              </>
            )}
          </div>
          <button>
            <Greater />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 h-1/2 max-w-screen-lg w-full">
          <button onClick={() => paginate(-1)}>
            <Greater className={"rotate-180"} />
          </button>
          {slideIndex === 0 && (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ZvVKoLONnOQ"
              title="NOISE VID RECAP"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          {slideIndex === 1 && (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/io61JKX5Pms"
              title="HTV - Triển lãm tương tác NOISE"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          {slideIndex === 2 && (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/8syQ34BYQBI"
              title="Khách mời hôm nay Nhóm sinh viên FPT cùng triển lãm tương tác   Noise Truyền hình Quốc H"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}

          <button onClick={() => paginate(1)}>
            <Greater />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
