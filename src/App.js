import { Link, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavLink from "./components/shared/NavLink";
import { Arrow } from "./assets/icon";

function App() {
  const location = useLocation();

  return (
    // <div className="App">
    //   <DetectorComponent />
    //   <ArtWork01Component />
    // </div>
    <main className="w-full h-full flex flex-col overflow-auto overflow-x-hidden relative">
      {location.pathname.split("/")[1] !== "interactive" && (
        <div className="flex gap-8 justify-center mt-10 max-w-full">
          <NavLink url="interactive" name="interactive" /> |
          <NavLink url="gallery" name="gallery" /> |
          <NavLink url="about" name="about" />
        </div>
      )}

      <Outlet />
      {location.pathname !== "/" &&
        location.pathname.split("/")[1] !== "interactive" && (
          <Link
            to=""
            className="absolute text-lg bottom-4 left-4 border border-white flex items-center justify-center rounded-full hover:text-black hover:bg-white duration-300"
          >
            <Arrow className="hover:fill-black duration-300" />
          </Link>
        )}
    </main>
  );
}

export default App;
