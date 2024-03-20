import React from 'react'
import { useTheme } from '../../hooks/ThemeContext';

const FavoritePage = () => {
    const { isDarkMode } = useTheme();
    const serviceLists = [
        { id: 1, title: "Catering", des: "Delight your guests with our flavors and  presentation", img: "/images/home/services/icon1.png" },
        { id: 2, title: "Fast delivery", des: "We deliver your order promptly to your door", img: "/images/home/services/icon2.png" },
        { id: 3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering n", img: "/images/home/services/icon3.png" },
        { id: 4, title: "Gift Cards", des: "Give the gift of exceptional dining with bookstore Gift Cards", img: "/images/home/services/icon4.png" },
    ]

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className={`bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
                <div className="py-28 flex flex-col items-center justify-center">
                    {/* content */}
                    <div className=" text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Contact <span className="text-mainBG"> Us</span>
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
export default FavoritePage