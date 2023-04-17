import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ArtworkLink from "../components/shared/ArtworkLink";
import { ArtWork01Component } from "../components/artworks/ArtWork01Component";
import BackHomeArrow from "../components/shared/BackHomeArrow";

const Interactive = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("song");

  const [open, setOpen] = useState(false);

  document.onmousemove = handleMouseMove;

  function handleMouseMove(event) {
    if (event.clientX <= 150 && open === false) {
      setOpen(!open);
    }
    if (event.clientX >= 459 && open === true) {
      setOpen(!open);
    }
  }

  const linkArray = [
    { url: "song", name: "Song .9" },
    { url: "nghia", name: "Nghia .8" },
    { url: "viu", name: "Viu .8" },
    { url: "boi", name: "Boi .9" },
    { url: "vung", name: "Vung .7" },
  ];

  useEffect(() => {
    if (location.pathname === "/interactive")
      setTimeout(() => {
        navigate("song");
      }, 400);
  }, [location.pathname, navigate]);

  return (
    <Layout>
      <div className="flex w-full h-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              initial={{ x: -459, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -459, opacity: 0 }}
              transition={{ type: "tween" }}
              className="side-bar flex flex-col w-[459px] max-w-full absolute top-0 left-0 overflow-auto bg-[#080808] h-full z-10"
            >
              <div className="header p-8 border-b border-white flex justify-between gap-4 items-center relative">
                <BackHomeArrow />
              </div>
              <div className="link-container flex flex-col">
                <LayoutGroup id="artwork-nav">
                  {linkArray.map((link) => {
                    return (
                      <ArtworkLink
                        key={link.name}
                        url={link.url}
                        name={link.name}
                        selected={selected === link.url}
                        onClick={() => setSelected(link.url)}
                      />
                    );
                  })}
                </LayoutGroup>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="main-content grow overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path=":id" element={<ArtWork01Component />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Interactive;
