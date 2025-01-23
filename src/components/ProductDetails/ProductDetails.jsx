import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import RelatedProducts from "../RelatedProducts/RelatedProducts";

export default function ProductDetails() {
  const { id, category } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [currentProduct, setcurrentProduct] = useState([]);

  function getProduct() {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        const product = response.data.data;
        setcurrentProduct(product);
        console.log(product);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }


  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <>
      {!isLoading ? (
        <div className="row items-center">
          <div className="md:w-1/4 px-2">
            <img
              src={currentProduct?.imageCover}
              alt={currentProduct?.title}
              className="w-full"
            />
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
      ) : (
        <>
          <div className="flex justify-center items-center min-h-screen w-full">
            <span className="loader"></span>
          </div>
        </>
      )}
    <RelatedProducts category={category}/>

    </>
  );
}
