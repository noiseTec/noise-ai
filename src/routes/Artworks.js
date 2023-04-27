import React from "react";
import ReactDOM from "react-dom";
import Layout from "../components/shared/Layout";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { wrap } from "popmotion";
import Artwork01 from "../assets/artworks/01siudai/banner01.png";
import Artwork02 from "../assets/artworks/02siudai/banner02.png";
import Artwork03 from "../assets/artworks/03siudai/banner03.png";
import Artwork04 from "../assets/artworks/04siudai/banner04.png";
import Artwork5_1 from "../assets/artworks/05/1.png";
import Artwork5_2 from "../assets/artworks/05/2.png";
import Artwork5_3 from "../assets/artworks/05/3.png";
import Artwork5_4 from "../assets/artworks/05/4.png";
import Artwork5_5 from "../assets/artworks/05/5.png";
import Artwork6_1 from "../assets/artworks/06/1_upper.png";
import Artwork6_2 from "../assets/artworks/06/2_upper.png";
import Artwork6_3 from "../assets/artworks/06/3_upper.png";
import Artwork6_4 from "../assets/artworks/06/4_upper.png";
import Artwork6_5 from "../assets/artworks/06/5_upper.png";
import Artwork6_6 from "../assets/artworks/06/6_upper.png";
import Artwork6_7 from "../assets/artworks/06/7_upper.png";
import Artwork6_8 from "../assets/artworks/06/8_upper.png";
import { Greater } from "../assets/icon";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Modal = ({ url, setSelected }) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="modal w-full h-full fixed  top-0 left-0 z-20 flex items-center justify-center px-6"
    >
      <div
        className="w-full h-full absolute backdrop bg-black opacity-80 top-0 left-0 cursor-pointer"
        onClick={() => setSelected(null)}
      ></div>
      <img
        src={url}
        alt=""
        className="opacity-100 z-30 border-2 border-white"
      />
    </motion.div>,
    document.body
  );
};

const Artworks = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const [selected, setSelected] = useState(null);

  const handleImageClick = (url) => {
    setSelected(url);
  };

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const slideIndex = wrap(0, 6, page);

  return (
    <Layout>
      <div className="flex items-center justify-center gap-10 w-full h-full absolute overflow-hidden pb-32">
        <button onClick={() => paginate(-1)}>
          <Greater className={"rotate-180"} />
        </button>
        <div
          id="artwork-container"
          className="h-full w-full px-6 sm:max-w-screen-sm items-center justify-center flex overflow-x-hidden overflow-auto relative"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                type: "tween",
              }}
              className="absolute top-0"
            >
              {slideIndex === 0 && <img src={Artwork01} />}
              {slideIndex === 1 && <img src={Artwork02} />}
              {slideIndex === 2 && <img src={Artwork03} />}
              {slideIndex === 3 && <img src={Artwork04} />}
              {slideIndex === 4 && (
                <div className="flex flex-col items-center justify-center gap-10">
                  <img
                    onClick={() => handleImageClick(Artwork5_1)}
                    src={Artwork5_1}
                    className="border-white border-4 cursor-pointer"
                  />
                  <img
                    onClick={() => handleImageClick(Artwork5_2)}
                    src={Artwork5_2}
                    className="border-white border-4 cursor-pointer"
                  />
                  <img
                    onClick={() => handleImageClick(Artwork5_3)}
                    src={Artwork5_3}
                    className="border-white border-4 cursor-pointer"
                  />
                  <img
                    onClick={() => handleImageClick(Artwork5_4)}
                    src={Artwork5_4}
                    className="border-white border-4 cursor-pointer"
                  />
                  <img
                    onClick={() => handleImageClick(Artwork5_5)}
                    src={Artwork5_5}
                    className="border-white border-4 cursor-pointer"
                  />
                </div>
              )}
              {slideIndex === 5 && (
                <div className="flex flex-col items-center justify-center gap-4">
                  <img src={Artwork6_1} />
                  <img src={Artwork6_2} />
                  <img src={Artwork6_3} />
                  <img src={Artwork6_4} />
                  <img src={Artwork6_5} />
                  <img src={Artwork6_6} />
                  <img src={Artwork6_7} />
                  <img src={Artwork6_8} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={() => paginate(1)}>
          <Greater />
        </button>
      </div>
      {selected !== null && <Modal url={selected} setSelected={setSelected} />}
    </Layout>
  );
};

export default Artworks;
