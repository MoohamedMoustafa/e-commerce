import React, { useContext, useEffect, useState } from "react";
import style from "./WishLsit.module.css";
import { WishListContext } from "../../Context/WishListContext";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";

export default function WishLsit() {
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {addToCart} = useContext(CartContext);
  const { getWishList, removeFromWishList } = useContext(WishListContext);

  async function getUerWishList() {
    setIsLoading(true);
    try {
      const response = await getWishList();
      console.log("respone from getWishList", response);
      console.log("respone wishList Items", response.data.data);
      setWishList(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteItem(productId) {
    try {
      const respone = await removeFromWishList(productId);
      console.log("respone from removeFromWishList", respone);
      if(respone.data.status === "success") {
        console.log("Product removed from wishlist");
        toast.success("Product removed from wishlist");
        await getUerWishList();
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error.message);
    }
  }

  async function handleAddToCart(productId) {
    try {
      const response = await addToCart(productId);
      if (response.data.status === "success") {
        console.log("Product added to cart");
        toast.success("Product added to cart");  
        await handleDeleteItem(productId);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  }

  useEffect(() => {
    getUerWishList();    
  }, []);

  if (isLoading)
    return (
      <div>
        <ClipLoader color="green" />
      </div>
    );


    if (wishList?.length === 0)
      return (
        <>
          <div className="flex flex-col items-center justify-center gap-6 p-8">
            <div className="flex justify-center items-center min-h-[60vh] w-full text-xl font-semibold text-gray-600 bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-8">
              No items in Wish List
            </div>
            <div className="text-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-50 bg-emerald-500 hover:bg-emerald-600 rounded-md transition-colors duration-200"
              >
                Check new products now
              </Link>
            </div>
          </div>
        </>
      );

  return (
    <>
      <h3 className="text-lg font-semibold text-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm mb-6 w-full md:w-1/3 mx-auto">
        My Wish List
      </h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
              <th scope="col" className="px-6 py-3">
                Add To Cart
              </th>
            </tr>
          </thead>
          <tbody>
            {wishList.map((product) => {
              return <WishListItem key={product._id} product={product} onDeleteitem={handleDeleteItem} onAddItem={handleAddToCart} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function WishListItem({ product, onDeleteitem, onAddItem }) {
  return (
    <>
      <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
        <td className="p-4">
          <img
            src={product.imageCover}
            className="w-16 md:w-32 max-w-full max-h-full"
            alt="Apple Watch"
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {product.title}
        </td>
        <td className="px-6 py-4">{product.price} </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          <span className="text-red-500 cursor-pointer" onClick={() => onDeleteitem(product.id)}>Remove</span>
        </td>
        <td className="px-6 py-4">
          <span className="text-green-500 cursor-pointer" onClick={() => onAddItem(product.id)}>Add To Cart</span>
        </td>
      </tr>
    </>
  );
}
