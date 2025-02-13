import React, { useEffect, useState } from "react";
import style from "./RelatedProducts.module.css";
import { Link } from "react-router-dom";
import useProducts from "./../../Hooks/useProducts";
import { ClipLoader } from 'react-spinners';

export default function RelatedProducts({ category }) {
  const [relatedProducts, setRelatedProducts] = useState([]); // new

  const { data: productList, isError, isLoading, error } = useProducts();

  useEffect(() => {
    if (productList && productList.length > 0) {
      const newProductsList = productList.filter(
        (product) => product.category.name === category
      );
      setRelatedProducts(newProductsList);
      console.log("productList: ", productList);
    }
  }, [category, productList]);

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
    console.error("error from RalatedProducts: ", error);
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
      {/* related poroducts  */}
      <div className="row gap-y-8 my-10">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="md:w-1/6 px-2 ">
              <div className="product px-2 py-1">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full"
                  />
                  <h3 className=" text-emerald-600 mb-1">
                    {product.category.name}
                  </h3>
                  <h3 className="font-semibold mb-1">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-around mb-2">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn">Add To Cart</button>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="flex justify-center items-center min-h-screen w-full">
              <span className="loader"></span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
