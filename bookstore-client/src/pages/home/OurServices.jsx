import React from "react";

const serviceLists = [
  { id: 1, title: "Customer Care", des: "We have support staff available to assist you 24/7 with any questions.", img: "/images/home/services/icon1.png"},
  { id: 2, title: "Fast delivery", des: "We deliver your order promptly to your door faster than you think", img: "/images/home/services/icon2.png" },
  { id: 3, title: "Online Ordering", des: "Explore category & order with ease using our Online Ordering ", img: "/images/home/services/icon3.png" },
  { id: 4, title: "Promotions", des: "Give the promotions for the book lovers to get their books which they want", img: "/images/home/services/icon4.png" },
]

const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Literary Adventure and Offerings</h2>
            <p className="my-5 text-secondary leading-[30px]">
              Fueled by our love for books, we carefully select captivating reads and provide exceptional services,
              combining literary treasures with welcoming expertise.
            </p>

            <button className="bg-mainBG font-semibold btn text-white px-8 py-3 rounded-full">
              Explore
            </button>
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
