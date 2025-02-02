import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  function getAllCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        const categories = response.data.data;
        // console.log("categories", categories);
        setCategories(categories);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    infinite: true,
    cssEase: 'linear',
  };

  return (
    <>
    <h2 className="text-gray-600 font-semibold mt-4 mb-2 capitalize text-start pl-5">shop popular categories</h2>
      <Slider {...settings}>
        {categories.map(category => {
          return (
            <div key={category._id} className="text-center ml-16 my-2">
              <img src={category.image} alt={category.name} className="h-[200px] object-cover w-full" />
              <h3>{category.name}</h3>

            </div>
          )
        })}
      </Slider>
    </>
  );
}
