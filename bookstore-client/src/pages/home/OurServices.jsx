import React from "react";
import { Link } from "react-router-dom";

const serviceLists = [
  { id: 1, title: "Chăm sóc khách hàng", des: "Chúng tôi có nhân viên hỗ trợ sẵn sàng giúp bạn 24/7 với bất kỳ câu hỏi nào.", img: "/images/home/services/icon1.png" },
  { id: 2, title: "Giao hàng nhanh", des: "Chúng tôi giao hàng nhanh chóng đến cửa nhà bạn một cách nhanh chóng.", img: "/images/home/services/icon2.png" },
  { id: 3, title: "Đặt hàng trực tuyến", des: "Khám phá các danh mục & đặt hàng dễ dàng thông qua trang web trực tuyến.", img: "/images/home/services/icon3.png" },
  { id: 4, title: "Khuyến mãi", des: "Cung cấp các khuyến mãi để người dùng mua được sách mong muốn", img: "/images/home/services/icon4.png" }
]

const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Câu Chuyện và Dịch Vụ của Chúng Tôi</p>
            <h2 className="title">Hành Trình Văn Học và Các Ưu Đãi Của Chúng Tôi</h2>
            <p className="my-5 text-secondary leading-[30px]">
              Được thúc đẩy bởi tình yêu dành cho sách, chúng tôi tỉ mỉ lựa chọn những đầu sách hấp dẫn và cung cấp dịch vụ
              xuất sắc, kết hợp bảo vệ những kho báu văn học với sự chuyên nghiệp nồng nhiệt.
            </p>

            <Link to="/service-page">
            <button className="bg-mainBG font-semibold btn text-white px-8 py-3 rounded-full">
              Khám phá
            </button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {
              serviceLists.map((service) => (
                <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-mainBG cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                  <img src={service.img} alt="" className=" mx-auto" />
                  <h5 className="pt-3 font-semibold"> {service.title}</h5>
                  <p className="text-[#90BD95]">{service.des}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
