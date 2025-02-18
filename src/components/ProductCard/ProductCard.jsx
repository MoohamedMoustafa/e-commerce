import React, { useContext, useEffect, useState } from "react";
import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

export default function ProductCard({ product, isProductInWishList }) {
  const { addToCart } = useContext(CartContext);
  const { AddToWishList, removeFromWishList } = useContext(WishListContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isHandlingWishList, setIsHandlingWishList] = useState(false);
  async function addProductToCart(productId) {
    setIsLoading(true);
    const response = await addToCart(productId);
    console.log("respone from addProductToCart: ", response);
    if (response.data.status === "success") {
      toast.success("Product added to cart successfully");
      setIsLoading(false);
    } else {
      toast.error("Failed to add product to cart");
      setIsLoading(false);
      console.error("Failed to add product to cart", response.data.message);
    }
  }
  //function to toggle wishlist click
  async function handleWishListClick(productId) {
    setIsHandlingWishList(true);
    try {
      if (isProductInWishList) {
        await removeFromWishList(productId);
        toast.success("Product removed from wishlist");
      } else {
        await AddToWishList(productId);
        toast.success("Product added to wishlist");
      }
    } catch (error) {
      console.error(
        "Error adding/removing product from wishlist: ",
        error.message
      );
    } finally {
      setIsHandlingWishList(false);
    }
  }

  return (
    <>
      <div key={product.id} className="sm:w-1/3 md:w-1/5 px-2">
        <div className="product px-2 py-1">
          <Link to={`/productdetails/${product.id}/${product.category?.name}`}>
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full"
            />
            <h3 className="text-emerald-600 mb-1">{product.category?.name}</h3>
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
          <span
            className="cursor-pointer"
            onClick={() => handleWishListClick(product.id)}
          >
            {isHandlingWishList ? (
              <i className="fa-solid fa-spinner fa-spin" spin="true"></i>
            ) : (
              <i
                className={`fa-solid fa-heart ${
                  isProductInWishList ? "text-red-600" : "text-black"
                }`}
              ></i>
            )}
          </span>
          <button
            className="btn"
            onClick={() => addProductToCart(product.id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin" spin="true"></i>
            ) : (
              `Add To Cart`
            )}
          </button>
        </div>
      </div>
    </>
  );
}
