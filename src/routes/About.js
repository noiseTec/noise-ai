import React from "react";
import Layout from "../components/shared/Layout";
import Team from "../assets/about.png";

const About = () => {
  return (
    <Layout>
      <div className="flex flex-col w-full h-full items-center justify-center px-14 sm:px-4">
        <div className="text-5xl font-semibold uppercase leading-snug mb-5">
          About Us
        </div>
        <img src={Team} alt="about-us" className="max-h-[500px]" />
        <div className="max-w-[700px] mt-8 text-center text-xs sm:text-base">
          Chúng tôi là một nhóm 3 sinh viên ngành thiết kế mỹ thuật số, được dẫn
          dắt bởi cô Cúc Phương tại đại học FPT HCM. Cùng sự đam mê nhiệt huyết
          với nghệ thuật thị giác, chúng tôi đã thành công thực hiện buổi triển
          lãm NOISE - triển lãm tương tác về vấn đề nhiễu loạn thông tin trên
          internet. Qua buổi triển lãm, chúng tôi muốn truyền tải thông điệp:
          "Những dòng thông tin nhiễu loạn có thể đến từ bất cứ đâu, kể cả chính
          con người. Bạn sẽ đối đầu với chúng như thế nào?"
        </div>
      </div>
    </Layout>
  );
};

export default About;
