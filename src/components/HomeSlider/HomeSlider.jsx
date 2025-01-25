import React, { useEffect, useState } from "react";
import style from "./HomeSlider.module.css";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import slide4 from "../../assets/images/grocery-banner.png";
import slide5 from "../../assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function HomeSlider() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    infinite: true,
    cssEase: "linear",
    arrows: false,

  };

  return (
    <>
      <div className="row mb-5">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={slide1} alt="" className="w-full h-[400px]" />
            <img src={slide2} alt="" className="w-full h-[400px]" />
            <img src={slide3} alt="" className="w-full h-[400px]" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={slide2} alt="" className="w-full h-[200px]" />
          <img src={slide3} alt="" className="w-full h-[200px]" />
        </div>
      </div>
    </>
  );
}
