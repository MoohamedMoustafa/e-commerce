import React, { useContext, useEffect, useState } from "react";
import style from "./RelatedProducts.module.css";
import useProducts from "./../../Hooks/useProducts";
import { ClipLoader } from "react-spinners";
import ProductCard from "../ProductCard/ProductCard";
import { WishListContext } from "../../Context/WishListContext";

export default function RelatedProducts({ category }) {
  const [relatedProducts, setRelatedProducts] = useState([]); // new

  const { data: productList, isError, isLoading, error } = useProducts();
  const { wishList } = useContext(WishListContext);
  function isProductInWishList(productId) {
    return wishList?.some((product) => product.id === productId);
  }
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
  if(relatedProducts.length === 0) {
    return (<div className="flex justify-center items-center min-h-screen w-full">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
      <p className="text-gray-600">We couldn't find any products matching your criteria.</p>
    </div>
  </div>)
  }

  return (
    <>
      {/* related poroducts  */}
      <h3 className="text-center text-2xl font-bold text-green-800  mt-10 mb-5">Related Products</h3>
      <div className="row gap-y-8 my-10c">
        {relatedProducts.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            isProductInWishList={isProductInWishList(product.id)}
          />
        ))}
      </div>
    </>
  );
}
