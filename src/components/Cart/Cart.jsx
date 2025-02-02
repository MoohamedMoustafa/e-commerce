import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getCart, deleteCartItem } = useContext(CartContext);
  async function getCartItems() {
    setIsLoading(true);
    const response = await getCart();
    if (response.data.status === "success") {
      setCartDetails(response.data);
      setIsLoading(false);
      console.log("response fron getCartItems", response.data.data.products);
    } else {
      console.error("Failed to get cart items", response.data);
      setIsLoading(false);
    } 
  }
  async function deleteItem(productId) {
    try {
      const response = await deleteCartItem(productId);
      if (response.data.status === "success") {
        // getCartItems(); // Refresh cart
        console.log("from deleteItem", response);
        setCartDetails(response.data)
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
    }
  }
  useEffect(() => {
    getCartItems();
  }, []);
  useEffect(() => {
    console.log("cartDetails: ", cartDetails);
  }, [cartDetails]);

  useEffect(() => {}, []);

  if (isLoading) return <div>Loading...</div>;
  if (!cartDetails?.data?.products) return <div>No items in cart</div>;
  return (
    <>
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
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.data.products.map((item) => {
              return (
                <CartItem item={item} key={item._id} deleteItem={deleteItem}  />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
