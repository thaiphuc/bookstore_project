import React from 'react'
import { useTheme } from '../../hooks/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

const ServicePage = () => {
    const { isDarkMode } = useTheme();
    const serviceLists = [
        { id: 1, title: "Chăm sóc khách hàng", des: "Chúng tôi có nhân viên hỗ trợ sẵn sàng giúp bạn 24/7 với bất kỳ câu hỏi nào.", img: "/images/home/services/icon1.png" },
        { id: 2, title: "Giao hàng nhanh", des: "Chúng tôi giao hàng nhanh chóng đến cửa nhà bạn một cách nhanh chóng.", img: "/images/home/services/icon2.png" },
        { id: 3, title: "Đặt hàng trực tuyến", des: "Khám phá các danh mục & đặt hàng dễ dàng thông qua trang web trực tuyến.", img: "/images/home/services/icon3.png" },
        { id: 4, title: "Khuyến mãi", des: "Cung cấp các khuyến mãi để người dùng mua được sách mong muốn", img: "/images/home/services/icon4.png" }
    ]

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className={`bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
                <div className="py-28 flex flex-col items-center justify-center">
                    {/* content */}
                    <div className="text-center px-4 space-y-7">
                        <h2 className="mb-10 md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Dịch vụ của <span className="text-mainBG">Chúng tôi</span>
                        </h2>
                        <div>
                            <div className="section-container my-8">
                                <div className="md:w-full">
                                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                                        {serviceLists.map((service) => (
                                            <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center text-mainBG cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                                                <img src={service.img} alt="" className="mx-auto" />
                                                <h5 className="pt-3 font-semibold">{service.title}</h5>
                                                <p className="text-[#90BD95]">{service.des}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <h2 className="mb-10 md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                                Câu chuyện của <span className="text-mainBG">Chúng tôi</span>
                            </h2>
                            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                                <li>
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-start md:text-end mb-10">
                                        <time className="font-mono italic">Tầm nhìn</time>
                                        <div className="text-lg font-black text-cl2">(Vision)</div>
                                        Tạo nên một không gian trực tuyến đẳng cấp, nơi mọi người có thể khám phá và tìm kiếm những cuốn sách phong phú và đa dạng từ mọi thể loại và tác giả trên toàn thế giới.                                    </div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-end md:text-start mb-10">
                                        <time className="font-mono italic">Mục tiêu</time>
                                        <div className="text-lg font-black text-cl3">(Mission)</div>
                                        Xây dựng một nền tảng thân thiện và thuận tiện, giúp người dùng dễ dàng tìm kiếm, mua sắm và tương tác với sách một cách linh hoạt và tiện lợi nhất.
                                    </div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-start md:text-end mb-10">
                                        <time className="font-mono italic">Chiến Lược</time>
                                        <div className="text-lg font-black text-purple-500">(Strategy)</div>
                                        Phát triển một trải nghiệm mua sắm trực tuyến độc đáo và tinh tế, kết hợp cùng các tính năng đặc biệt như đánh giá và nhận xét từ cộng đồng, gợi ý sách dựa trên sở thích cá nhân, và các chương trình khuyến mãi hấp dẫn để tạo ra sự kích thích và hứng thú cho người dùng.
                                    </div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                    <div className="timeline-middle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div className="timeline-end md:text-start mb-10">
                                        <time className="font-mono italic">Thành tựu</time>
                                        <div className="text-lg font-black text-mainBG">(Achievement)</div>
                                        Trở thành điểm đến hàng đầu cho người đam mê sách trên mọi lứa tuổi, với một cộng đồng lớn mạnh và sự tin cậy từ khách hàng. Đồng thời, đóng góp vào việc tăng cường văn hóa đọc và kiến thức trong cộng đồng.
                                    </div>
                                    <hr />
                                </li>
                                <li>
                                    <hr />
                                </li>
                            </ul>
                            <div className="stats shadow mt-10">
                                <div className="stat">
                                    <div className="stat-figure text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                    </div>
                                    <div className="stat-title">Lượt thích trang</div>
                                    <div className="stat-value text-primary">20.24K</div>
                                    <div className="stat-desc text-secondary">Khách hàng đánh giá cao dịch vụ</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-pink">
                                        <FontAwesomeIcon icon={faThumbsUp} className="inline-block w-8 h-8" />
                                    </div>
                                    <div className="stat-title">Hỗ trợ khách hàng trực tuyến</div>
                                    <div className="stat-value text-pink">10.2K</div>
                                    <div className="stat-desc text-secondary">Hài lòng với phục vụ</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <div className="stat-figure text-mainBG">
                                            <FontAwesomeIcon icon={faTruck} className="inline-block w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="stat-title">Tỉ lệ giao hàng</div>
                                    <div className="stat-value text-mainBG">96%</div>
                                    <div className="stat-desc text-secondary">Giao hàng thành công và đúng hẹn</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicePage;
