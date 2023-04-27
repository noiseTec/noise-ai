import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavLink from "./components/shared/NavLink";
import React, { useState } from "react";
import { LayoutGroup } from "framer-motion";
import BackHomeArrow from "./components/shared/BackHomeArrow";

function App() {
  const location = useLocation();

  const [selected] = useState(location.pathname.split("/")[1]);

  const linkArr = ["interactive", "gallery", "artworks", "about"];
  // ${
  //   location.pathname.split("/")[1] !== "artworks"
  //     ? "overflow-auto"
  //     : "overflow-hidden"
  return (
    <main
      className={`w-full h-full flex flex-col relative overflow-hidden`}
    >
      {location.pathname.split("/")[1] !== "interactive" && (
        <div
          id="navbar"
          className="flex gap-8 justify-center py-10 max-w-full sticky top-0 z-10"
        >
          <LayoutGroup>
            {linkArr.map((el, i) => (
              <React.Fragment key={i}>
                <NavLink url={el} selected={selected === el} />
                {i < linkArr.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </LayoutGroup>
        </div>
      )}

      <Outlet />
      {location.pathname !== "/" &&
        location.pathname.split("/")[1] !== "interactive" && (
          <BackHomeArrow className={"fixed"} />
        )}
    </main>
  );
}

export default App;
