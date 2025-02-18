import React, { useEffect, useState } from "react";
import style from "./RelatedProducts.module.css";
import { Link } from "react-router-dom";
import useProducts from "./../../Hooks/useProducts";
import { ClipLoader } from 'react-spinners';
import ProductCard from "../ProductCard/ProductCard";

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
        {
          relatedProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        }
      </div> 
    </>
  );
}
