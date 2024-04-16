import React from 'react'
import { useTheme } from '../../hooks/ThemeContext';

const ServicePage = () => {
    const { isDarkMode } = useTheme();
    const serviceLists = [
        { id: 1, title: "Email", des: "Gửi qua email: pnqbookstore@gmail.com", img: "/images/home/contacts/icon1.png" },
        { id: 2, title: "Số điện thoại", des: "Số liên lạc: +84-976-785-069", img: "/images/home/contacts/icon2.png" },
        { id: 3, title: "Địa chỉ", des: "Địa chỉ: VVN St, Linh Chieu, Thu Duc City", img: "/images/home/contacts/icon3.png" },
        { id: 4, title: "Hotline", des: "Gọi khẩn cấp: 1900-2604", img: "/images/home/contacts/icon4.png" },
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
                        <div className="section-container my-16">
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
                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <div className="stat-title">Total Likes</div>
                                <div className="stat-value text-primary">25.6K</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <div className="stat-title">Page Views</div>
                                <div className="stat-value text-secondary">2.6M</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <div className="avatar online">
                                        <div className="w-16 rounded-full">
                                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-value">86%</div>
                                <div className="stat-title">Tasks done</div>
                                <div className="stat-desc text-secondary">31 tasks remaining</div>
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
