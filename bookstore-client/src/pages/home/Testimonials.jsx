/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">TRẢI NGHIỆM VÀ PHẢN HỒI</p>
            <h2 className="title">Những Gì <span className="text-mainBG">Khách Hàng</span> Của Chúng Tôi Đánh Giá
            </h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              “Gần đây tôi đã ghé thăm cửa hàng sách trực tuyến và tôi phải nói, tôi thực sự rất hài lòng với trải nghiệm đó!
              Sự chú ý tỉ mỉ đến từng chi tiết trong thiết kế trang web và giao diện người dùng thật sự đáng kinh ngạc.”
            </blockquote>


            {/* avatar */}

            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h5 className="text-lg font-semibold">Phản hồi từ khách hàng</h5>
                <div className="flex items-center gap-2"><FaStar className="text-yellow-400" /> <span className="font-medium">4.9</span> <span className="text-[#807E7E]">(14.9k đánh giá)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
