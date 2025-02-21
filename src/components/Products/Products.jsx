import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import ProductCard from "../ProductCard/ProductCard";
import useProducts from "./../../Hooks/useProducts";
import { ClipLoader } from "react-spinners";
import { WishListContext } from "../../Context/WishListContext";
import SearchInput from "../SearchInput/SearchInput";

export default function Products() {
  const [searchedWords, setSearchedWords] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {
    data: productList,
    isError,
    isLoading,
    error,
    isFetching,
  } = useProducts();
  const { wishList } = useContext(WishListContext);


  function isProductInWishList(productId) {
    return wishList?.some((product) => product.id === productId);
  }

  function filterProducts() {
    if(searchedWords === "") {
      setFilteredProducts(productList);
      return;
    }
    const filteredList = productList.filter((product) => {
      return product.title.toLowerCase().includes(searchedWords.toLowerCase());
    })
    setFilteredProducts(filteredList);
  }

useEffect(() => {
  console.log("searchedWords: ", searchedWords);
  filterProducts();
  if(searchedWords === "") {
    console.log("empty");
  }
} , [searchedWords])

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
      <h1 className="text-2xl font-bold mb-5 text-green-700">All Products</h1>

      <SearchInput onSeach={setSearchedWords} value={searchedWords} />
      <div className="row gap-y-8 justify-center items-center">
        {filteredProducts.length > 0  ? filteredProducts?.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            isProductInWishList={isProductInWishList(product.id)}
          />
        )) :  <h3 className="self-center text-2xl font-bold ">No Products Found</h3> }
      </div>
    </>
  );
}
