import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Greater } from "../../assets/icon";

const ArtworkLink = ({ url, name, onClick, selected }) => {
  return (
    <motion.div>
      <NavLink
        onClick={onClick}
        to={url}
        className="p-10 pt-0 border-b flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-start gap-4 font-semibold text-xl z-10 pt-10 bg-[#080808]">
          <Greater className={`${selected ? "rotate-90" : ""}`} />
          <div className="font-semibold text-lg uppercase">{name}</div>
        </div>
        {selected && (
          <motion.div
            className="description mt-4 pl-10 text-base"
            layoutId="description"
          >
            {url === "song" && (
              <div>
                Thông tin có thể được xem như những đường thẳng song song, chúng
                diễn ra có trình tự, diễn biến cụ thể và độc lập. Khi con người
                can thiệp chúng, thông tin dẫn trở nên nhiễu loạn và bị bóp méo
                theo ý muốn chủ quan của con người. Điều đó khiến cho những câu
                chữ dường như không còn tính nguyên bản, bị cắt ghép nhằm mục
                đích định hướng dư luận đi theo chiều mà họ muốn.
              </div>
            )}
            {url === "nghia" && (
              <div>
                Hàng loat ký tự “N” tràn nhập màn hình chính là viết tắt cho từ
                “News”. Thế nhưng khi có bàn tay con người tác động vào và ra
                sức nhào nặn, những thông tin ấy dường như đã trở nên biến chất:
                “n-o-i-s-e-nhiễu loạn” vì mỗi người sẽ tiếp nhận thông tin theo
                ý muốn chủ quan của họ, và chỉ chắt lọc n hững gì họ muốn biết.
              </div>
            )}
            {url === "viu" && (
              <div>
                Khi internet ngày càng phát triển, chúng ta ngày càng trở nên
                “bội thực” với những thông tin pha trộn thật giả. Mớ rác điện tử
                ấy được thể hiện qua những ký tự nhiễu đầy trên màn hình kia và
                cần phải có sự kiểm duyệt của con người vào cuộc. Nhưng trong
                thời đại phát triển công nghệ như hiện nay, dù có cố gắng dọn
                “rác” như thế nào, vẫn sẽ luôn có những nền tảng mới và “rác”
                mới mỗi giây.
              </div>
            )}
            {url === "boi" && (
              <div>
                Chúng ta thường được rót vào tai những câu chuyện bị “tam sao
                thất bản”. Mỗi một lần câu chuyện được kể chính là một lần sự
                việc bị thay đổi đi đôi chút. Và thế là chúng ta, trong vai
                những người muốn tìm hiểu sự thật, cuối cùng những gì nhận lại
                chỉ là sự góp nhặt thông in từ vô số lần câu chuyện bị miệng đời
                biến hoá.
              </div>
            )}
            {url === "vung" && (
              <div>
                Thế giới nhiễu loạn là như thế. Vậy nhưng khi chúng ta chuẩn bị
                cho mình một tâm thế bình tĩnh, đứng lại giữa những luồng thông
                tin để nhìn nhận sự việc một cách đa chiều thì những nhiễu loạn
                trên khó mà lung lay được chúng ta trên con đường tìm kiếm tri
                thức. Càng ra sức chạy theo số đông thì càng dễ bị dắt mũi, mà
                thôi!
              </div>
            )}
          </motion.div>
        )}
      </NavLink>
    </motion.div>
  );
};

export default ArtworkLink;
