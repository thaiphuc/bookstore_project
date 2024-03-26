import React from 'react'
import { useTheme } from '../../hooks/ThemeContext';

const AboutUsPage = () => {
    const { isDarkMode } = useTheme();
    const serviceLists = [
        {
            id: 1, title: "Thái Hoàng Phúc- Front End Developer", des: "Transforming Ideas into Captivating Digital Destinations: Your Vision, Our Expertise.", img: "/images/home/avatar/avatarphuc.jpg"
        },
        {
            id: 2, title: "Phạm Nguyễn Phú Quí - Back End Developer", des: "Architecting Tomorrow's Solutions, One Line of Code at a Time.", img:"/images/home/avatar/avatarphuc.jpg"
        },
    ]
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className={`bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
                <div className="py-28 flex flex-col items-center justify-center">
                    {/* content */}
                    <div className=" text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            About <span className="text-mainBG"> Us</span>
                        </h2>
                        <div className="section-container my-16">

                            <div className="md:w-full">
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
                </div>
            </div>
        </div>
    )
}
export default AboutUsPage