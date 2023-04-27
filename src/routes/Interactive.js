import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ArtworkLink from "../components/shared/ArtworkLink";
import { ArtWork01Component } from "../components/artworks/ArtWork01Component";
import BackHomeArrow from "../components/shared/BackHomeArrow";
import { Greater } from "../assets/icon";
import ArtWork02Component from "../components/artworks/ArtWork02Component";
import ArtWork03Component from "../components/artworks/Artwork03Component";
import ArtWork04Component from "../components/artworks/Artwork04Component";
import ArtWork05Component from "../components/artworks/Artwork05Component";

const Interactive = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(() => {
    const initialState = location.pathname.split("/")[2];
    if (initialState) return initialState;
    else return "nghia";
  });
  document.onmousemove = handleMouseMove;

  function handleMouseMove(event) {
    const sideBar = document.getElementById("side-bar");
    if (sideBar) {
      if (event.clientX <= 132) {
        sideBar.classList.add("active");
      }
      if (event.clientX >= 459) {
        sideBar.classList.remove("active");
      }
    }
  }

  function toggleNav() {
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav) {
      mobileNav.classList.toggle("open");
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
        navigate("nghia");
      }, 400);
  }, [location.pathname, navigate]);

  return (
    <Layout>
      <div className="flex w-full h-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            id="side-bar"
            className="side-bar duration-300 sm:flex flex-col max-w-full absolute top-0 left-0 overflow-auto bg-[#080808] h-full z-10"
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
        </AnimatePresence>

        <div
          id="mobile-nav"
          className="mobile-nav sm:hidden fixed w-full pt-6 top-0 z-10 bg-[#080808] pb-2 flex flex-col gap-2"
        >
          <div className="flex items-center justify-center gap-3">
            {linkArray.map((link, i) => {
              return (
                <React.Fragment key={i}>
                  <NavLink
                    to={link.url}
                    onClick={() => setSelected(link.url)}
                    className={`text-[#444444] font-semibold text-xs uppercase duration-300`}
                  >
                    {link.name}
                  </NavLink>

                  {i < linkArray.length - 1 && (
                    <div className="bg-white w-[1px] h-4 separator duration-300"></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <BackHomeArrow className={"fixed"} />
          <div className="hidden description duration-300">
            {selected === "song" && (
              <div className="px-[22px] py-3 font-semibold text-xs">
                Thông tin có thể được xem như những đường thẳng song song, chúng
                diễn ra có trình tự, diễn biến cụ thể và độc lập.<br></br>
                <br></br> Khi con người can thiệp chúng, thông tin dẫn trở nên
                nhiễu loạn và bị bóp méo theo ý muốn chủ quan của con người.
                Điều đó khiến cho những câu chữ dường như không còn tính nguyên
                bản, bị cắt ghép nhằm mục đích định hướng dư luận đi theo chiều
                mà họ muốn.
              </div>
            )}
            {selected === "nghia" && (
              <div className="px-[22px] py-3 pb-3 font-semibold text-xs">
                Hàng loat ký tự “N” tràn nhập màn hình chính là viết tắt cho từ
                “News”.<br></br>
                <br></br> Thế nhưng khi có bàn tay con người tác động vào và ra
                sức nhào nặn, những thông tin ấy dường như đã trở nên biến chất:
                “n-o-i-s-e-nhiễu loạn” vì mỗi người sẽ tiếp nhận thông tin theo
                ý muốn chủ quan của họ, và chỉ chắt lọc n hững gì họ muốn biết.
              </div>
            )}
            {selected === "viu" && (
              <div className="px-[22px] py-3 pb-3 font-semibold text-xs">
                Khi internet ngày càng phát triển, chúng ta ngày càng trở nên
                “bội thực” với những thông tin pha trộn thật giả.<br></br>
                <br></br> Mớ rác điện tử ấy được thể hiện qua những ký tự nhiễu
                đầy trên màn hình kia và cần phải có sự kiểm duyệt của con người
                vào cuộc. Nhưng trong thời đại phát triển công nghệ như hiện
                nay, dù có cố gắng dọn “rác” như thế nào, vẫn sẽ luôn có những
                nền tảng mới và “rác” mới mỗi giây.
              </div>
            )}
            {selected === "boi" && (
              <div className="px-[22px] py-3 pb-3 font-semibold text-xs">
                Chúng ta thường được rót vào tai những câu chuyện bị “tam sao
                thất bản”.<br></br>
                <br></br> Mỗi một lần câu chuyện được kể chính là một lần sự
                việc bị thay đổi đi đôi chút. Và thế là chúng ta, trong vai
                những người muốn tìm hiểu sự thật, cuối cùng những gì nhận lại
                chỉ là sự góp nhặt thông in từ vô số lần câu chuyện bị miệng đời
                biến hoá.
              </div>
            )}
            {selected === "vung" && (
              <div className="px-[22px] py-3 pb-3 font-semibold text-xs">
                Thế giới nhiễu loạn là như thế.<br></br>
                <br></br> Vậy nhưng khi chúng ta chuẩn bị cho mình một tâm thế
                bình tĩnh, đứng lại giữa những luồng thông tin để nhìn nhận sự
                việc một cách đa chiều thì những nhiễu loạn trên khó mà lung lay
                được chúng ta trên con đường tìm kiếm tri thức. Càng ra sức chạy
                theo số đông thì càng dễ bị dắt mũi, mà thôi!
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button className=" rotate-90" onClick={toggleNav}>
              <Greater className={"w-4 h-4"} />
            </button>
          </div>
        </div>
        {/* <div style={{ position: "fixed", zIndex: 10000 }}>
          <DetectorComponent />
        </div> */}
        <div className="main-content grow overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/song" element={<ArtWork01Component />} />
              <Route path="/nghia" element={<ArtWork02Component />} />
              <Route path="/viu" element={<ArtWork03Component />} />
              <Route path="/boi" element={<ArtWork04Component />} />
              <Route path="/vung" element={<ArtWork05Component />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default Interactive;
