import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import useSpeceficProduct from "../../Hooks/useSpeceficProduct";
import { ClipLoader } from "react-spinners";

export default function ProductDetails() {
  const { id, category } = useParams();
  const [currentProduct, setcurrentProduct] = useState([]);

  const { data: product, isLoading, isError, error } = useSpeceficProduct(id);
  useEffect(() => {
    if (product) {
      setcurrentProduct(product);
    }
  }, [product]);

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

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen w-full">
          <ClipLoader color={"green"} />
        </div>
      </>
    );
  }

  if (isError) {
    console.error("error from ProductDetails: ", error);
    return (
      <>
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
          role="alert"
        >
          <span class="font-medium">{error}</span>
        </div>
      </>
    );
  }

  return (
    <>
      {
        <div className="row items-center">
          <div className="md:w-1/4 px-2">
            {/* <img
              src={currentProduct?.imageCover}
              alt={currentProduct?.title}
              className="w-full"
            /> */}
            <Slider {...settings}>
              {currentProduct.images?.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt={currentProduct?.title}
                  className="w-full p-2"
                />
              ))}
            </Slider>
          </div>
          <div className="md:w-3/4 px-2 text-start">
            <h3 className="font-semibold text-2xl">{currentProduct?.title}</h3>
            <h4 className="text-gray-600 my-3 capitalize">
              {currentProduct?.description}
            </h4>
            {/* <h4 className="">{currentProduct?.category.name}</h4> */}
            <div className="flex justify-between  lg:pr-4 my-3 mb-5">
              <span>{currentProduct.price} EGP</span>
              <span>
                <i className="fas fa-star text-yellow-400"></i>
                {currentProduct.ratingsAverage}
              </span>
            </div>
            <button className="btn">Add To Cart</button>
          </div>
        </div>
      }
      <RelatedProducts category={category} />
    </>
  );
}
