import { Link, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavLink from "./components/shared/NavLink";
import { Arrow } from "./assets/icon";
import React, { useState } from "react";
import { LayoutGroup } from "framer-motion";

function App() {
  const location = useLocation();

  const [selected] = useState(location.pathname.split("/")[1]);

  const linkArr = ["interactive", "gallery", "about"];

  return (
    <main className="w-full h-full flex flex-col relative overflow-x-hidden">
      {location.pathname.split("/")[1] !== "interactive" && (
        <div className="flex gap-8 justify-center py-10 max-w-full">
          <LayoutGroup>
            {linkArr.map((el, i) => (
              <React.Fragment key={i}>
                <NavLink
                  url={el}
                  selected={selected === el}
                />
                {i < linkArr.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </LayoutGroup>
        </div>
      )}

      <Outlet />
      {location.pathname !== "/" &&
        location.pathname.split("/")[1] !== "interactive" && (
          <Link
            to=""
            className="fixed text-lg bottom-4 left-4 border border-white flex items-center justify-center rounded-full hover:text-black hover:bg-white duration-300"
          >
            <Arrow className="hover:fill-black duration-300" />
          </Link>
        )}
    </main>
  );
}

export default App;
