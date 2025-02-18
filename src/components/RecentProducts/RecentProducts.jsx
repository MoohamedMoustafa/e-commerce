import React, { useCallback, useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import { ClipLoader } from "react-spinners";
import ProductCard from "../ProductCard/ProductCard";
import useProducts from "../../Hooks/useProducts";
import { WishListContext } from "../../Context/WishListContext";

export default function RecentProducts() {
  const {
    data: productList,
    isError,
    isLoading,
    error,
    isFetching,
  } = useProducts();
  const { wishList } = useContext(WishListContext);
  useEffect(() => {
    console.log("wishList from RecentProducts: ", wishList);
  }, [wishList]);

  //function to check if product is inside wishList
  function isProductInWishList(productId) {
    return wishList?.some((product) => product.id === productId);
  }
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
    console.error("error from RecentProducts: ", error);
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
      <div className="row gap-y-8">
        {productList?.map((product) => (
          <ProductCard product={product} key={product.id} isProductInWishList={isProductInWishList(product.id)} />
        ))}
      </div>
    </>
  );
}
