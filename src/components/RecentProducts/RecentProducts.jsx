import React, { useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import ProductCard from "../ProductCard/ProductCard";
import useProducts from "../../Hooks/useProducts";

export default function RecentProducts() {
  const {data: productList,
    isError,
    isLoading,
    error,
    isFetching,} = useProducts();

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
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </>
  );
}
